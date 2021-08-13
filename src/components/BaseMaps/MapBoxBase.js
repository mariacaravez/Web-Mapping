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
import { Button, Input, Form, Icon, Label } from "semantic-ui-react";
import env from "react-dotenv";

import { useDispatch, useSelector } from "react-redux";
import { mapInfoActions } from "../../redux-store/mapSlice";
import { aoiActions } from "../../redux-store/aoiSlice";

import * as turf from "@turf/turf";
import bboxPolygon from "@turf/bbox-polygon";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = env.MB_TOKEN;

// To retrieve area of current map view
turf.bboxPolygon = bboxPolygon;

const MapBoxBase = () => {
  const dispatch = useDispatch();

  // Geocoding Setup to retrieve community information
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

  const update = useSelector((state) => state.areaOfInterest.update);

  //Local Variables
  const [lngField, setLngField] = useState(lng);
  const [latField, setLatField] = useState(lat);
  const [zoomField, setZoomField] = useState(zoom);

  const [north, setNorth] = useState(0);
  const [east, setEast] = useState(0);
  const [south, setSouth] = useState(0);
  const [west, setWest] = useState(0);

  /* Set Map Input Fields Begins */
  const handleLng = (e, { value }) => {
    setLngField(value);
    dispatch(mapInfoActions.setLng({ lng: value }));
  };

  const handleLat = (e, { value }) => {
    setLatField(value);
    dispatch(mapInfoActions.setLat({ lat: value }));
  };

  const handleZoom = (e, { value }) => {
    setZoomField(value);
    dispatch(mapInfoActions.setZoom({ zoom: value }));
  };
  /* Set Map Input Fields Ends */

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

  /* 
  *  HELPER FUNCTION: Sets map information in
  *  Redux store with current input field values
  */
  const setMapInfo = () => {
    dispatch(mapInfoActions.setLat({ lat: latField }));
    dispatch(mapInfoActions.setLng({ lng: lngField }));
    dispatch(mapInfoActions.setZoom({ zoom: zoomField }));
  };

  // Update map information in real-time
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

  // Continously checks update variable in order to refresh dashboard
  useEffect(() => {
    if (update) {
      setAoI();
    }
  });

  const setAoI = () => {
    // Clears previous bounds array from AoI Redux slice
    dispatch(aoiActions.clearBounds());

    // Helper function: Line 90
    setMapInfo();

    // Goes to the location based on user input
    map.current.flyTo({
      center: [lngField, latField],
      zoom: zoomField,
      essential: true,
    });

    // Creates a bounding box object for polygon
    var bbox = [west, south, east, north];
    // Creates a polygon for area
    var aoi = turf.bboxPolygon(bbox);
    // Gets area of polygon
    var area = turf.area(aoi);
    // Translates area to square kilometers
    var areaSqKms = area / 1000000;
    // Minimizes area to two decimal points
    var rounded_area = Math.round(areaSqKms * 100) / 100;

    // Set area in AoI Redux slice
    dispatch(aoiActions.setArea({ area: rounded_area }));

    // Sets bounds in AoI Redux Slice
    dispatch(
      aoiActions.setBounds({
        north: Math.round(north * 100) / 100,
        east: Math.round(east * 100) / 100,
        south: Math.round(south * 100) / 100,
        west: Math.round(west * 100) / 100,
      })
    );

    // Performs query for area of interest information
    getCommunityInfo();

    // Resets update variable that controls refresh button in dashboard
    dispatch(aoiActions.updateInfo({ update: false }));
  };

  /*
   * Function that retrieves community information based on the current
   * coordinates via MapBox API and then sets the objects in array
   * within the AoI Redux slice to display on Dashboard.
   */
  const getCommunityInfo = () => {
    // Clears previous community info array  from AoI Redux slice
    dispatch(aoiActions.clearCommunityInfo());

    /*
     * Query is not reading current variables as
     * number objects so had to typecast variables
     */
    var lngF = Number(lngField);
    var latF = Number(latField);

    // Retrieves information of area with current coordinates
    geocodingClient
      .reverseGeocode({
        query: [lngF, latF],
      })
      .send()
      .then((response) => {
        // Iterates through GeoJSON object of AoI information
        try {
          response.body.features.forEach((element) =>
            // Saves community information from query to AoI Redux slice
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
    // Updates zoom field value
    setZoomField(value);
    
    // Updates Map Redux slice
    dispatch(mapInfoActions.setZoom(value));

    // Zooms in on current coordinates
    map.current.flyTo({
      center: [lngField, latField],
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
                onChange={handleZoom}
              />
            </Form.Field>
            {/* Area of Interest Input Fields Ends */}
            <Form.Field>
              <Button color="green" type="submit" icon="arrow right" />
            </Form.Field>
          </Form.Group>
        </Form>
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
