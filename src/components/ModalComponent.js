import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
} from "reactstrap";
import { v4 as uuid } from "uuid";

class IdeaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      body: "",
      color: "#FFFFFF",
      selectedBucketId: "new",
      newBucketId: "",
      createNewBucket: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.inComingData) {
        const tmp = this.props.inComingData;
        this.setState({
          name: tmp.name,
          body: tmp.body,
          color: tmp.color,
          selectedBucketId: tmp.selectedBucketId,
          createNewBucket: false,
        });
      } else {
        this.setState({
          createNewBucket: true,
          selectedBucketId: "new",
        });
      }
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name);
    this.setState({
      [name]: value,
    });
    if (name === "selectedBucketId") {
      if (value === "new") {
        this.setState({ createNewBucket: true });
      } else {
        this.setState({ createNewBucket: false });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const note = {
      id: uuid(),
      name: this.state.name,
      body: this.state.body,
      color: this.state.color,
    };
    this.props.addNoteToBucket(
      this.state.selectedBucketId !== "new"
        ? this.state.selectedBucketId
        : this.state.newBucketId,
      note
    );
    this.setState({
      name: "",
      body: "",
      color: "#FFFFFF",
      selectedBucketId: "new",
      newBucketId: "",
      createNewBucket: true,
    });
    if (this.props.inComingData) {
      setTimeout(() => {
        this.props.inComingData.cb();
      }, 100);
    }
    this.props.toggleModal();
  }

  render() {
    const list = this.props.allBuckets.map((note) => {
      return <option key={note.id}>{note.id}</option>;
    });
    return (
      <React.Fragment>
        <Modal isOpen={this.props.open} toggle={this.props.toggleModal}>
          <ModalHeader toggle={this.props.toggleModal}>
            Post Your Idea
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label htmlFor="name" md={3}>
                  Name
                </Label>
                <Col md={6}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name..."
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="bucket" md={3}>
                  Select Bucket
                </Label>
                <Col md={6}>
                  <Input
                    type="select"
                    name="selectedBucketId"
                    id="selectedBucketId"
                    value={this.state.selectedBucketId}
                    onChange={this.handleInputChange}
                  >
                    <option value="new">Create New Bucket</option>
                    {list}
                  </Input>
                </Col>
              </FormGroup>
              {this.state.createNewBucket && (
                <Col md={6}>
                  <FormGroup row>
                    <Input
                      type="text"
                      id="newBucketId"
                      name="newBucketId"
                      placeholder="Enter Bucket Name..."
                      value={this.state.newBucketId}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
              )}
              <FormGroup row>
                <Label htmlFor="body" md={3}>
                  Body
                </Label>
                <Col md={6}>
                  <Input
                    type="textarea"
                    id="body"
                    name="body"
                    rows="6"
                    value={this.state.body}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="color" md={3}>
                  Page Color
                </Label>
                <Col md={2}>
                  <Input
                    type="color"
                    id="color"
                    name="color"
                    value={this.state.color}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
            </Form>
            <Button type="submit" color="info" onClick={this.handleSubmit}>
              Add Highlight
            </Button>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default IdeaModal;
