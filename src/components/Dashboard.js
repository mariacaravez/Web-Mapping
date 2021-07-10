import React from "react";
import { Header, Image, Table, Icon, Label } from "semantic-ui-react";

const Dashboard = () => (
  <Table basic="very" celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Content</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header>
            <Header.Content as="h4">Community Location</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>Address Goes Here</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4">
            <Header.Content>Community Name</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>Name of Community</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4">
            <Header.Content>AoI Coordinates</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>X:  , Y: </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4">
            <Header.Content>AoI Area</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>1234 sq. Kms</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Dashboard;
