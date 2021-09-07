import React, { Component } from "react";
import AllBuckets from "./AllBuckets";
import { Navbar, NavbarBrand, Nav, Button } from "reactstrap";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroupedData: false,
    };
    this.toggleShowGroupData = this.toggleShowGroupData.bind(this);
  }

  toggleShowGroupData() {
    this.setState({ showGroupedData: !this.state.showGroupedData });
  }
  componentDidMount() {
    document.body.style.zoom = "100%";
  }
  handleZoomIn() {
    document.body.style.zoom = `${parseInt(document.body.style.zoom) + 10}%`;
  }
  handleZoomOut() {
    document.body.style.zoom = `${parseInt(document.body.style.zoom) - 10}%`;
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar light expand="md">
          <NavbarBrand style={{ color: "orangered" }} className="m-auto header">
            IDEA MANAGEMENT TOOL
          </NavbarBrand>
          <Nav navbar>
            <Button
              style={{ backgroundColor: "black" }}
              onClick={this.toggleShowGroupData}
            >
              Group Highlights
            </Button>
          </Nav>
        </Navbar>
        <AllBuckets showGroupedData={this.state.showGroupedData} />
        <Button color="link" className="zoomin" onClick={this.handleZoomIn}>
          <span className="fa fa-search-plus fa-lg"></span>
        </Button>
        <Button color="link" className="zoomout" onClick={this.handleZoomOut}>
          <span className="fa fa-search-minus fa-lg"></span>
        </Button>
      </div>
    );
  }
}

export default Main;
