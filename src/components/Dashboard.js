/*
 * Author: Maria Caravez
 * Description: This component is used to display the information
 * within the community info object in the Redux store aoiSlice
 * within a table collection.
 */

import React, { useEffect, useState } from "react";
import {
  Header,
  List,
  Table,
  Segment,
  Label,
  Button,
  Placeholder,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { mapInfoActions } from "../store/mapSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const bounds = useSelector((state) => state.areaOfInterest.bounds);
  const area = useSelector((state) => state.areaOfInterest.area);
  const communityInfo = useSelector(
    (state) => state.areaOfInterest.communityInfo
  );

  const handleRefresh = () => {
    dispatch(mapInfoActions.updateInfo({ update: true }));
    // console.log("Refresh!");
  };

  return (
    <Rnd
      default={{
        x: 40,
        y: 85,
        width: 450,
        height: 445,
      }}
      minWidth={300}
      maxHeight={525}
      bounds="window"
    >
      <Segment raised>
        <Label
          color="blue"
          attached="top"
          size="huge"
          style={{ textAlign: "center" }}
        >
          Area of Interest
        </Label>
        <Table
          basic="very"
          celled
          collapsing
          style={{ paddingTop: "2vh" }}
        >
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Content</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {communityInfo.map((item, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>{item.type}</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{item.label}</Table.Cell>
              </Table.Row>
            ))}

            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  {/* <Header.Content>AoI Coordinates</Header.Content> */}
                  <Header.Content>AoI Bounds</Header.Content>
                </Header>
              </Table.Cell>

              <Table.Cell>
                <List>
                  {bounds.map((item, i) => (
                    <List.Item key={i}>
                      <b>N: </b>
                      {item.north}, <b>E: </b>
                      {item.east}, <b>S: </b>
                      {item.south}, <b>W: </b>
                      {item.west}
                    </List.Item>
                  ))}
                  {/* <List.Item>
                    NW: [{bounds[1].lat}, {bounds[1].lng}] NE: [{bounds[0].lat},
                    {bounds[0].lng}]
                  </List.Item>
                  <List.Item>
                    SW: [{bounds[3].lat}, {bounds[3].lng}] SE: [{bounds[2].lat},
                    {bounds[2].lng}]
                  </List.Item> */}
                </List>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>AoI Area</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{area} sq km </Table.Cell>
            </Table.Row>


          </Table.Body>
        </Table>
        <Button
              attached="bottom"
              corner="right"
              icon="refresh"
              circular
              style={{backgroundColor: "#dae9f5"}}
              onClick={handleRefresh}
            />
      </Segment>
    </Rnd>
  );
};

export default Dashboard;
