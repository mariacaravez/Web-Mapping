import React, { Fragment, useEffect, useState } from "react";
import { Button, Input, Form, Icon, Menu, Dropdown, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mapInfoActions } from "../mapSlice";
import { aoiActions } from "../aoiSlice";
import BaseMaps from "./BaseMaps/BaseMaps";
import MapBoxBase from "./BaseMaps/MapBoxBase";
import BingBase from "./BaseMaps/BingBase";
import GoogleBase from "./BaseMaps/GoogleBase";

const basemaps = [
  { key: "MB", text: "Mapbox", value: 1 },
  { key: "B", text: "Bing", value: 2 },
  { key: "G", text: "Google Maps", value: 3 },
];

const NavBar = () => {
  const dispatch = useDispatch();

  // Gets current state of mapInfo from Redux store
  const lng = useSelector((state) => state.mapInfo.lng);
  const lat = useSelector((state) => state.mapInfo.lat);
  const zoom = useSelector((state) => state.mapInfo.zoom);
  // const aoiSet = useSelector((state) => state.mapInfo.aoiSet);

  //Local Variables
  const [lngField, setLngField] = useState(lng);
  const [latField, setLatField] = useState(lat);
  const [zoomField, setZoomField] = useState(zoom);

  /* Set or Change Current Base Map */
  const [basemapSelection, setBaseMapSelection] = useState(null);
  const currentMap = useSelector((state) => state.mapInfo.currentMap);

  useEffect(() => {
    setBaseMapSelection(currentMap);
  }, [currentMap]);

  /* Set Map Input Fields Begins */
  const handleLng = (e, { value }) => {
    setLngField(value);
  };

  const handleLat = (e, { value }) => {
    setLatField(value);
  };

  const handleZoom = (e, { value }) => {
    setZoomField(value);
  };

  /* Set Map Input Fields Ends */

  const handleBaseMap = (e, { value }) => {
    setBaseMapSelection(value);
  };

  // Goes to the Area of Interest
  const setAoI = () => {
    // Removes previous AoI information
    dispatch(aoiActions.clearCommunityInfo());

    dispatch(mapInfoActions.setAoI(true));

    // Set variables in Map Info Redux slice
    dispatch(mapInfoActions.setLat({ lat: latField }));
    dispatch(mapInfoActions.setLng({ lng: lngField }));
    dispatch(mapInfoActions.setZoom({ zoom: zoomField }));

    // Set variables in AoI Redux slice
    dispatch(aoiActions.setLongitude({ longitude: lngField }));
    dispatch(aoiActions.setLatitude({ latitude: latField }));
  };

  return (
    <Fragment>
      <Menu>
        <Menu.Item as={Link} to="/">
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
        </Menu.Item>
        <Menu.Item position="right">
          <Form onSubmit={setAoI} label="Area of Interest">
            {/* Area of Interest Input Fields Begins */}
            <Form.Group>
              <Form.Field>
                <Input
                  label={{ basic: true, content: "Longitude" }}
                  type="number"
                  step="0.000001"
                  min="-180"
                  max="180"
                  placeholder="-74.5"
                  value={lngField}
                  onChange={handleLng}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  label={{ basic: true, content: "Latitude" }}
                  type="number"
                  step="0.000001"
                  min="-90"
                  max="90"
                  placeholder="40"
                  value={latField}
                  onChange={handleLat}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  label={{ basic: true, content: "Zoom" }}
                  type="number"
                  step="0.01"
                  min="1"
                  max="22"
                  placeholder="17"
                  value={zoomField}
                  onChange={handleZoom}
                />
              </Form.Field>
              {/* Area of Interest Input Fields Ends */}

              <Form.Field>
                <Button color="green" type="submit">
                  Set AoI
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </Menu.Item>
      </Menu>
      <Container fluid className="map-container">
      {basemapSelection === 1 && <MapBoxBase />}
      {basemapSelection === 2 && <BingBase />}
      {basemapSelection === 3 && <GoogleBase />}
      </Container>
    </Fragment>
  );
};

export default NavBar;
