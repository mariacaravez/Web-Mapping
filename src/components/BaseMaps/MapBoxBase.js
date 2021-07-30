/*
 * Author: Maria Caravez
 * Description: This is Base Map #1 (used for logic in BaseMaps component)
 * It retrieves the map information from the Redux store mapSlice and
 * displays it accordingly.
 *
 * Map Information:
 * Longitude (X) [West-East] Range: -180 through +180
 * Latitude (Y) [North-South] Range: -90 through +90
 */
import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Icon,
  Popup,
  Container,
  Label,
} from "semantic-ui-react";
import env from "react-dotenv";

import { useDispatch, useSelector } from "react-redux";
import { mapInfoActions } from "../../store/mapSlice";
import { aoiActions } from "../../store/aoiSlice";

import * as turf from "@turf/turf";
import bboxPolygon from "@turf/bbox-polygon";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import Dashboard from "../Dashboard";

turf.bboxPolygon = bboxPolygon;

//"pk.eyJ1IjoidGltd2lsbGFlcnQiLCJhIjoiY2s1d2l0Ym5yMDlhdTNobnhhaDNsY2hwYSJ9.oVOhCQf5j61IBbpYvhzLwA";
mapboxgl.accessToken = env.MB_TOKEN;

const MapBoxBase = () => {
  const dispatch = useDispatch();

  // Geocoding Setup
  const mbxClient = require("@mapbox/mapbox-sdk");
  const geocoder = require("@mapbox/mapbox-sdk/services/geocoding");
  const baseClient = mbxClient({ accessToken: env.MB_TOKEN });
  const geocodingClient = geocoder(baseClient);

  // For Map Initialization
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Redux Objects
  const lng = useSelector((state) => state.mapInfo.lng);
  const lat = useSelector((state) => state.mapInfo.lat);
  const zoom = useSelector((state) => state.mapInfo.zoom);

  const update = useSelector((state) => state.mapInfo.update);
  const inputs = useSelector((state) => state.mapInfo.inputs);

  //Local Variables
  const [lngField, setLngField] = useState(lng);
  const [latField, setLatField] = useState(lat);
  const [zoomField, setZoomField] = useState(zoom);

  const [north, setNorth] = useState(0);
  const [east, setEast] = useState(0);
  const [south, setSouth] = useState(0);
  const [west, setWest] = useState(0);

  // Initialize Map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lngField, latField],
      zoom: zoomField,
    });

    // Add zoom +/- controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  });

  // Update map as fields change
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLngField(map.current.getCenter().lng.toFixed(4));
      setLatField(map.current.getCenter().lat.toFixed(4));
      setZoomField(map.current.getZoom().toFixed(2));
    });

    // Retrieves the extent of the map
    setEast(map.current.getBounds().getNorthEast().lng);
    setNorth(map.current.getBounds().getNorthEast().lat);
    setWest(map.current.getBounds().getSouthWest().lng);
    setSouth(map.current.getBounds().getSouthWest().lat);
  });

  useEffect(() => {
    if (update) {
      setAoI();
    }
  });

  /* SLOWS DOWN APPLICATION */
  // useEffect(() => {
  //   if (inputs) {
  //     // console.log("Map Info: ", lng, lat, zoom);
  //     map.current.flyTo({
  //       center: [lngField, latField],
  //       zoom: zoomField,
  //       essential: true,
  //     });
  //   }
  // });

  const setAoI = () => {
    // Removes previous AoI information
    dispatch(aoiActions.clearBounds());

    // Goes to the location based on user input
    map.current.flyTo({
      center: [lngField, latField],
      zoom: zoomField,
      essential: true,
    });

    // BBox Format: [minX, minY, maxX, maxY]
    // i.e. [west, south, east, north]
    var bbox = [west, south, east, north];
    var aoi = turf.bboxPolygon(bbox);
    var area = turf.area(aoi);
    var areaSqKms = area / 1000000;
    var rounded_area = Math.round(areaSqKms * 100) / 100;

    // Set variables in AoI Redux slice
    dispatch(aoiActions.setArea({ area: rounded_area }));

    dispatch(
      aoiActions.setBounds({
        north: Math.round(north * 100) / 100,
        east: Math.round(east * 100) / 100,
        south: Math.round(south * 100) / 100,
        west: Math.round(west * 100) / 100,
      })
    );

    getCommunityInfo();

    // Reset Update 
    dispatch(mapInfoActions.updateInfo({ update: false }));
  };

  const getCommunityInfo = () => {
    console.log("Update: ", update);
    dispatch(aoiActions.clearCommunityInfo());

    /*
     * Query does not read current variables as
     * number objects so had to typecast variables
     */
    var lngF = Number(lngField);
    var latF = Number(latField);

    geocodingClient
      .reverseGeocode({
        /* Format: [longitude, latitude] */
        query: [lngF, latF],

        /* Format: [minLongitude, minLatitude, maxLongitude, maxLatitude] */
        // bbox: [west, south, east, north]
      })
      .send()
      .then((response) => {
        // GeoJSON document with geocoding matches
        try {
          response.body.features.forEach((element) =>
            dispatch(
              aoiActions.setCommunityInfo({
                type: element.place_type,
                label: element.place_name,
              })
            )
          );
        } catch {
          console.log("No community nearby.");
        }
      });
  };

  // Slider Updates the Area of Interest
  const moveSlider = (e, { value }) => {
    setZoomField(value);
    dispatch(mapInfoActions.setZoom(value));
    map.current.flyTo({
      center: [lngField, latField],
      zoom: value,
      essential: true,
    });
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <div ref={mapContainer} className="map-container">

        {/* Current Coordinate Display */}
        <div className="sidebar">
          Longitude: {lngField} | Latitude: {latField} | Zoom: {zoomField}
        </div>

        {/* Zoom Slider */}
        <Input
          className="slider"
          type="range"
          min="1"
          max="22"
          value={zoomField}
          onChange={moveSlider}
        >
          <Icon circular inverted name="minus" />
          <input />
          <Icon circular inverted name="plus" />
        </Input>

      </div>
    </div>
  );
};

export default MapBoxBase;
