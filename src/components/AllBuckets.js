import React, { Component, createRef } from "react";
import Bucket from "./Bucket";
import IdeaModal from "./ModalComponent";
import { Button } from "reactstrap";
import Cookies from 'js-cookie'
import {v4 as uuid} from "uuid"

export default class AllBuckets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inComingData: null,
      isModalOpen: false,
      allBuckets: [ ],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createNewBucket = this.createNewBucket.bind(this);
    this.deleteNoteFromBucket = this.deleteNoteFromBucket.bind(this);
    this.editNoteFromBucket = this.editNoteFromBucket.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  componentDidUpdate(){
    Cookies.remove("idea_management");
    Cookies.set("idea_management", JSON.stringify(this.state));
  }
  componentDidMount(){
    if(Cookies.get("idea_management")){
      this.setState(JSON.parse(Cookies.get("idea_management")));
      this.setState({incomingData:null});
    }
  }
  createNewBucket(bucketId, note) {
    //change this from temp to direct setState
    if (this.state.allBuckets.find((eachBucket) => eachBucket.id === bucketId)) {
      const tempAllBucket = this.state.allBuckets;
      tempAllBucket.forEach((eachBucket) => {
        if (eachBucket.id === bucketId) {
          eachBucket.allNotes.push(note);
        }
      });
      this.setState({
        allBuckets: tempAllBucket,
      });
      console.log('added the new note to'+ bucketId)
    } else {
      this.setState({
        allBuckets: [...this.state.allBuckets, { id: bucketId, allNotes: [note] }],
      });
    }
  }

  deleteNoteFromBucket(bucketId, noteId) {
    let tempAllBucket = this.state.allBuckets;
    let deleteThisBucket = null;
    tempAllBucket.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        eachBucket.allNotes = eachBucket.allNotes.filter((eachNote) => eachNote.id !== noteId);
      }
      if (eachBucket.allNotes.length === 0) {
        deleteThisBucket = eachBucket;
      }
    });
    if (deleteThisBucket) {
      tempAllBucket = tempAllBucket.filter((eachBucket) => eachBucket.id !== deleteThisBucket.id);
    }
    this.setState({
      allBuckets: tempAllBucket,
    });
  }

  editNoteFromBucket(bucketId, noteId, name, body, color) {
    const tempInComingData = {
      name,
      body,
      color,
      selectedBucketId: bucketId,
      cb: () => {
        this.deleteNoteFromBucket(bucketId, noteId);
        setTimeout(() => {
          this.setState({
            incomingData:null
          })
        }, 100);
      },
    };
    // console.log("before", this.incomingData);
    // this.incomingData.current = tempInComingData;
    // console.log("after", this.incomingData);
    this.setState({
      incomingData: tempInComingData,
    });
    setTimeout(() => {
      this.setState({
        isModalOpen: true,
      });
    }, 50);
  }

  render() {
    return (
      <div className="container-fluid">
        <Button id="add-btn" color="warning" size="sm" onClick={this.toggleModal}>
          <span className="fa fa-plus fa-lg"></span>
        </Button>
        <IdeaModal open={this.state.isModalOpen} toggleModal={this.toggleModal} addNoteToBucket={this.createNewBucket} allBuckets={this.state.allBuckets} inComingData={this.state.incomingData} />
        {this.state.allBuckets.map((eachBucket) => {
          return <Bucket key={eachBucket.id} showGroupedData={this.props.showGroupedData} id={eachBucket.id} allNotes={eachBucket.allNotes} allBuckets={this.state} deleteNoteFromBucket={this.deleteNoteFromBucket} editNoteFromBucket={this.editNoteFromBucket} />;
        })}
      </div>
    );
  }
}
