import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Icon, Dropdown, Menu, Button } from "semantic-ui-react";
import MapBoxBase from "./MapBoxBase";
import BingBase from "./BingBase";
import GoogleBase from "./GoogleBase";
import { minusZoom, plusZoom, setZoom } from "../../mapSlice";

const basemaps = [
  { key: "MB", text: "Mapbox", value: 1 },
  { key: "B", text: "Bing", value: 2 },
  { key: "G", text: "Google Maps", value: 3 },
];

const BaseMaps = () => {
  const dispatch = useDispatch();

  /* Longitude */
  const [lngField, setLngField] = useState(-74.5);
  const lng = useSelector((state) => state.mapInfo.lng);

  useEffect(() => {
    setLngField(lng);
  }, [lng]);

  const handleLng = (e, { value }) => {
    setLngField(value);
  };

  /* Latitude */
  const [latField, setLatField] = useState(40);
  const lat = useSelector((state) => state.mapInfo.lat);

  useEffect(() => {
    setLatField(lat);
  }, [lat]);

  const handleLat = (e, { value }) => {
    setLatField(value);
  };

  /* Zoom */
  const [zoomField, setZoomField] = useState(2);
  const zoom = useSelector((state) => state.mapInfo.zoom);

  useEffect(() => {
    setZoomField(zoom);
  }, [zoom]);

  const handleZoom = (e, { value }) => {
    setZoomField(value);
  };

  /* Base Map */
  const [basemapSelection, setBaseMapSelection] = useState(null);
  const currentMap = useSelector((state) => state.mapInfo.currentMap);

  useEffect(() => {
    setBaseMapSelection(currentMap);
  }, [currentMap]);

  const handleBaseMap = (e, { value }) => {
    setBaseMapSelection(value);
  };

  // 37.722291, -122.478854


  return (
    <Fragment>
      {/* <Menu style={{ padding: "0mm" }}> */}
        {/* <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item>
          <Icon name="map" />
          <Dropdown
            selection
            header="Choose Base Map"
            options={basemaps}
            value={basemapSelection}
            onChange={handleBaseMap}
          />
        </Menu.Item> */}
        {/* <Menu.Menu position="right">
          <Menu.Item></Menu.Item>
        </Menu.Menu> */}
      {/* </Menu> */}

      {/* Slider Begins */}
      {/* <Input
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
      </Input> */}
      {/* Slider Ends */}
      {basemapSelection === 1 && <MapBoxBase />}
      {basemapSelection === 2 && <BingBase />}
      {basemapSelection === 3 && <GoogleBase />}
    </Fragment>
  );
};

export default BaseMaps;
