/*
 * Base Map #1
 */

import React, { useRef, useEffect, useState } from "react";
import env from "react-dotenv";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Label, Form, Icon } from "semantic-ui-react";

//"pk.eyJ1IjoidGltd2lsbGFlcnQiLCJhIjoiY2s1d2l0Ym5yMDlhdTNobnhhaDNsY2hwYSJ9.oVOhCQf5j61IBbpYvhzLwA";
mapboxgl.accessToken = env.MB_TOKEN;

const MapBoxBase = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lngField, setLngField] = useState(-74.5);
  const [latField, setLatField] = useState(40);
  const [zoomField, setZoomField] = useState(2);

  const lng = useSelector((state) => state.mapInfo.lng);
  const lat = useSelector((state) => state.mapInfo.lat);
  const zoom = useSelector((state) => state.mapInfo.zoom);

  useEffect(() => {
    setLngField(lng);
  }, [lng]);

  useEffect(() => {
    setLatField(lat);
  }, [lat]);

  useEffect(() => {
    setZoomField(zoom);
  }, [zoom]);

  const handleLng = (e, { value }) => {
    setLngField(value);
  };

  const handleLat = (e, { value }) => {
    setLatField(value);
  };

  const handleZoom = (e, { value }) => {
    setZoomField(value);
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add zoom +/- controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  });

  // Saves coordinates from zoom
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLngField(map.current.getCenter().lng.toFixed(4));
      setLatField(map.current.getCenter().lat.toFixed(4));
      setZoomField(map.current.getZoom().toFixed(2));
    });
  });

  // useEffect(() => {
  //   if (!map.current) return; //
  //   map.current.on("move", () => {
  //     handleLng(map.current.getCenter().lng.toFixed(4));
  //     handleLat(map.current.getCenter().lat.toFixed(4));
  //     handleZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  const setAoI = () => {
    map.current.fitBounds([
      [32.958984, -5.353521], // southwestern corner of the bounds
      [43.50585, 5.615985] // northeastern corner of the bounds
      ]);
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <div ref={mapContainer} className="map-container">
        <Form
          onSubmit={setAoI}
          style={{ maxWidth: "50%" }}
          className="coordinates onMap"
          style={{ top: "1vh", left: "1vw" }}
          label="Area of Interest"
        >
          <Form.Group>
            <Form.Field>
              <Input
                label={{ basic: true, content: "Longitude" }}
                focus
                type="number"
                step="0.0001"
                min="-180"
                max="180"
                size="small"
                placeholder="-74.5"
                value={lngField}
                // defaultValue={lng}
                onChange={handleLng}
              />
            </Form.Field>

            <Form.Field>
              <Input
                label={{ basic: true, content: "Latitude" }}
                focus
                type="number"
                step="0.0001"
                min="-90"
                max="90"
                size="small"
                placeholder="40"
                value={latField}
                // defaultValue={lat}
                onChange={handleLat}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label={{ basic: true, content: "Zoom" }}
                focus
                type="number"
                step="0.000001"
                min="1"
                max="22"
                size="small"
                placeholder="17"
                // defaultValue={zoom}
                value={zoomField}
                onChange={handleZoom}
              />
            </Form.Field>
            <Button
              // className="onMap"
              color="green"
              type="submit"
            >
              Extent Example
            </Button>
          </Form.Group>
        </Form>
        {/* Slider Begins */}
        <Input
          className="slider"
          type="range"
          min="1"
          max="22"
          value={zoomField}
          onChange={handleZoom}
        >
          <Icon circular inverted name="minus" value={zoomField} />
          <input />
          <Icon circular inverted name="plus" value={zoomField} />
        </Input>
        {/* Slider Ends */}
      </div>
    </div>
  );
};

export default MapBoxBase;
