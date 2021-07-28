/*
 * Author: Maria Caravez
 * Description: This component is used to display the information
 * within the community info object in the Redux store aoiSlice
 * within a table collection.
 */

import React from "react";
import { Header, List, Table, Segment, Label } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Rnd } from "react-rnd";

const Dashboard = () => {
  const bounds = useSelector((state) => state.areaOfInterest.bounds);
  const area = useSelector((state) => state.areaOfInterest.area);
  const communityInfo = useSelector(
    (state) => state.areaOfInterest.communityInfo
  );

  return (
    <Rnd
      default={{
        x: 120,
        y: 35,
        width: 450,
        height: 500,
      }}
      minWidth={300}
      // minHeight={190}
      bounds="window"
    >
      <Segment>
        <Label color="blue" attached="top" size="huge" style={{ textAlign: "center" }}>
          Area of Interest
        </Label>
        <Table
          basic="very"
          celled
          collapsing
          fluid
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
                  {/* <List.Item>
                NW: [{bounds[1].lat}, {bounds[1].lng}] NE: [{bounds[0].lat}, {bounds[0].lng}]
              </List.Item>
              <List.Item>
                SW: [{bounds[3].lat}, {bounds[3].lng}] SE: [{bounds[2].lat}, {bounds[2].lng}]
              </List.Item> */}
                  <List.Item>
                    <b>N:</b> {bounds[0].lat}, <b>E:</b> {bounds[0].lng},{" "}
                    <b>S:</b> {bounds[3].lat}, <b>W:</b> {bounds[3].lng}
                  </List.Item>
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
      </Segment>
    </Rnd>
  );
};

export default Dashboard;
