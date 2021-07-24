/*
 * Author: Maria Caravez
 * Description: This component is used to display the information
 * within the community info object in the Redux store aoiSlice
 * within a table collection.
 */

import React, { Text } from "react";
import { Header, List, Table } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const bounds = useSelector((state) => state.areaOfInterest.bounds);
  const area = useSelector((state) => state.areaOfInterest.area);
  const communityInfo = useSelector(
    (state) => state.areaOfInterest.communityInfo
  );

  return (
    <Table basic="very" celled collapsing>
      <Table.Header>
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
              <Header.Content>AoI Coordinates</Header.Content>
            </Header>
          </Table.Cell>
          
            <Table.Cell>
            {bounds.map((item, i) => (
              <List horizontal><List.Item>[{item.lat}, {item.lng}]</List.Item></List>
              ))}
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
  );
};

export default Dashboard;
