/*
 * Base Map #1
 */

import React, { useRef, useEffect, useState } from "react";
import env from "react-dotenv";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Form,
  Icon,
  Segment,
  Modal,
  Container,
  Grid,
  Label,
  List,
} from "semantic-ui-react";
import { setLat, setLng, setZoom } from "../../mapSlice";
import Dashboard from "../Dashboard";

//"pk.eyJ1IjoidGltd2lsbGFlcnQiLCJhIjoiY2s1d2l0Ym5yMDlhdTNobnhhaDNsY2hwYSJ9.oVOhCQf5j61IBbpYvhzLwA";
mapboxgl.accessToken = env.MB_TOKEN;

// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   mapboxgl: mapboxgl,
// });

const MapBoxBase = () => {
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);

  const lng = useSelector((state) => state.mapInfo.lng);
  const lat = useSelector((state) => state.mapInfo.lat);
  const zoom = useSelector((state) => state.mapInfo.zoom);

  const [lngField, setLngField] = useState(lng);
  const [latField, setLatField] = useState(lat);
  const [zoomField, setZoomField] = useState(zoom);

  const [openDashboard, setOpenDashboard] = useState(false);

  const handleDashboard = (modal) => {
    setOpenDashboard(modal);
  };

  // useEffect(() => {
  //   setLngField(lng);
  // }, [lng]);

  // useEffect(() => {
  //   setLatField(lat);
  // }, [lat]);

  // useEffect(() => {
  //   setZoomField(zoom);
  // }, [zoom]);

  const handleLng = (e, { value }) => {
    setLngField(value);
    // dispatch(setLng(lngField));
  };

  const handleLat = (e, { value }) => {
    setLatField(value);
    // dispatch(setLat(latField));
  };

  const handleZoom = (e, { value }) => {
    setZoomField(value);
    // dispatch(setZoom(zoomField));
  };

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

  // Saves coordinates from zoom
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLngField(map.current.getCenter().lng.toFixed(4));
      setLatField(map.current.getCenter().lat.toFixed(4));
      setZoomField(map.current.getZoom().toFixed(2));
    });
    // geocoder.mapboxClient.geocodeReverse(
    //   {
    //     latitude: latField,
    //     longitude: lngField,
    //   },
    //   function (err, res) {
    //     console.log(err, res);
    //   }
    // );
  });
  const setAoI = () => {
    map.current.flyTo({
      center: [lngField, latField],
      zoom: zoomField,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    // dispatch(setLat(latField));
    // dispatch(setLng(lngField));
    // dispatch(setZoom(zoomField));

    // console.log("latField: ", latField);
    // console.log("lat: ", lat);
    // console.log("lngField: ", lngField);
    // console.log("lng: ", lng);
    // console.log("zoomField: ", zoomField);
    // console.log("zoom: ", zoom);
  };

  const moveSlider = (e, { value }) => {
    setZoomField(value);
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

            <Button color="green" type="submit">
              Set AoI
            </Button>

            {/* Dashboard Begins */}
            <Modal
              className="dashboard"
              basic
              dimmer="inverted"
              onClose={() => setOpenDashboard(false)}
              onOpen={() => setOpenDashboard(true)}
              open={openDashboard}
              trigger={<Button color="yellow">Dashboard</Button>}
              size="mini"
              className="alignment"
            >
              <Container>
                <Segment size="small" padded>
                  <Grid>
                    <Grid.Column>
                      <Dashboard />
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Container>

              <Modal.Actions className="alignment">
                <Button
                  color="black"
                  size="tiny"
                  onClick={() => setOpenDashboard(false)}
                >
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
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
