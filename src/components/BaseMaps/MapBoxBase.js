/*
 * Author: Maria Caravez
 * Description: This is Base Map #1 (used for logic in BaseMaps component)
 * It retrieves the map information from the Redux store mapSlice and
 * displays it accordingly.
 */
import React, { useRef, useEffect, useState } from "react";
import * as turf from "@turf/turf";
import bboxPolygon from "@turf/bbox-polygon";


// import {bboxPolygon} from "@turf/helpers"
import env from "react-dotenv";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Form, Icon, Popup, Label } from "semantic-ui-react";
import { mapInfoActions } from "../../mapSlice";
import { aoiActions } from "../../aoiSlice";

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

  const bounds = useSelector((state) => state.areaOfInterest.bounds);
  const aoiSet = useSelector((state) => state.mapInfo.aoiSet);

  //Local Variables
  const [lngField, setLngField] = useState(lng);
  const [latField, setLatField] = useState(lat);
  const [zoomField, setZoomField] = useState(zoom);

  /* Set Map Input Fields Begins */
  const handleLng = (e, { value }) => {
    setLngField(value);
    dispatch(mapInfoActions.setLng(value));
  };

  const handleLat = (e, { value }) => {
    setLatField(value);
    dispatch(mapInfoActions.setLat(value));
  };

  const handleZoom = (e, { value }) => {
    setZoomField(value);
    dispatch(mapInfoActions.setZoom(value));
  };

  /* Set Map Input Fields Ends */

  // Initialize Map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      // center: [lngField, latField],
      // zoom: zoomField,
      center: [lng, lat],
      zoom: zoom,
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
  });

  const setAoI = () => {
    // Removes previous AoI information
    dispatch(aoiActions.clearBounds());
    dispatch(aoiActions.clearCommunityInfo());

    // Goes to the location based on user input
    map.current.flyTo({
      center: [lngField, latField],
      zoom: zoomField,
      essential: true,
    });

    // Retrieves 
    var north = map.current.getBounds().getNorthEast().lng;
    var east = map.current.getBounds().getNorthEast().lat;
    var south = map.current.getBounds().getSouthWest().lng;
    var west = map.current.getBounds().getSouthWest().lat;

    // BBox Format: [minX, minY, maxX, maxY]
    // i.e. [west, south, east, north]
    var bbox = [west, south, east, north];

    var aoi = turf.bboxPolygon(bbox);
    var area = turf.area(aoi);
    var areaSqKms = area/1000000;

    var rounded_area = Math.round(areaSqKms * 100) / 100;

    // console.log("NE: ", lngLat);
    dispatch(aoiActions.setBounds({ lng: east, lat: north }));
    dispatch(aoiActions.setBounds({ lng: west, lat: south }));
    dispatch(aoiActions.setArea({area: rounded_area}));

    // Set variables in AoI Redux slice
    dispatch(aoiActions.setLongitude({ longitude: lngField }));
    dispatch(aoiActions.setLatitude({ latitude: latField }));

    console.log("These are the bounds:", bounds);
    // console.log("These are the local bounds:", lngLat);

    getCommunityInfo();
  };

  const getCommunityInfo = () => {
    /*
     * Query does not read current variables as
     * number objects so had to typecast variables
     */
    var lngF = Number(lngField);
    var latF = Number(latField);

    geocodingClient
      .reverseGeocode({
        // Format: Longitude, Latitude
        query: [lngF, latF],

        // types: ["address"],
        // bbox: [lngF - 0.001, latF - 0.001, lngF + 0.001, latF + 0.001],
      })
      .send()
      .then((response) => {
        // GeoJSON document with geocoding matches
        try {
          // response.body.features.forEach((element) =>
          //   console.log(element.place_type, element.place_name)
          // );
          console.log(response.body);
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
      // center: [lng, lat],
      zoom: value,
      essential: true,
    });
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <div ref={mapContainer} className="map-container">
        <Form
          onSubmit={setAoI}
          className="coordinates onMap"
          style={{ maxWidth: "50%", top: "1vh", left: "1vw" }}
          label="Area of Interest"
        >
          {/* Area of Interest Input Fields Begins */}
          <Form.Group>
            <Form.Field>
              <Input
                label={{ basic: true, content: "Longitude" }}
                focus
                type="number"
                step="0.000001"
                min="-180"
                max="180"
                size="small"
                placeholder="-74.5"
                value={lngField}
                // value={lng}
                onChange={handleLng}
              />
            </Form.Field>

            <Form.Field>
              <Input
                label={{ basic: true, content: "Latitude" }}
                focus
                type="number"
                step="0.000001"
                min="-90"
                max="90"
                size="small"
                placeholder="40"
                value={latField}
                // value={lat}
                onChange={handleLat}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label={{ basic: true, content: "Zoom" }}
                focus
                type="number"
                step="0.01"
                min="1"
                max="22"
                size="small"
                placeholder="17"
                value={zoomField}
                // value={zoom}
                onChange={handleZoom}
              />
            </Form.Field>
            {/* Area of Interest Input Fields Ends */}

            <Button color="green" type="submit">
              Set AoI
            </Button>

            {/* Dashboard Begins */}
            <Popup
              trigger={<Label content="Dashboard" color="blue" />}
              on="click"
              pinned
              position="bottom center"
              content={<Dashboard />}
            />
            {/* Dashboard Ends */}
          </Form.Group>
        </Form>

        {/* Slider Begins */}
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
        {/* Slider Ends */}
      </div>
    </div>
  );
};

export default MapBoxBase;
