import React, { Component, createRef } from "react";
import Bucket from "./Bucket";
import IdeaModal from "./ModalComponent";
import { Button } from "reactstrap";
import Cookies from "js-cookie";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default class AllBuckets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inComingData: null,
      isModalOpen: false,
      allBuckets: [],
      selectedNotes: [],
      ctrlPressed: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createNewBucket = this.createNewBucket.bind(this);
    this.deleteNoteFromBucket = this.deleteNoteFromBucket.bind(this);
    this.editNoteFromBucket = this.editNoteFromBucket.bind(this);
    this.findNoteFromId = this.findNoteFromId.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.addSelectedNotes = this.addSelectedNotes.bind(this);
    this.createNewBucketForSelectedNotes =
      this.createNewBucketForSelectedNotes.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  componentDidUpdate() {
    Cookies.remove("idea_management");
    Cookies.set("idea_management", JSON.stringify(this.state));
  }
  componentDidMount() {
    if (Cookies.get("idea_management")) {
      this.setState(JSON.parse(Cookies.get("idea_management")));
      this.setState({ incomingData: null });
    }
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "Control" &&
        !this.props.showGroupedData &&
        !this.state.isModalOpen
      ) {
        const bucketId = prompt("Enter New Bucket Name");
        if (bucketId.length > 0) {
          this.createNewBucketForSelectedNotes(bucketId);
        }
        this.setState({ ctrlPressed: false, selectedNotes: [] });
      }
    });
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Control" &&
        !this.props.showGroupedData &&
        !this.state.isModalOpen
      ) {
        this.setState({ ctrlPressed: true });
      }
    });
  }

  createNewBucketForSelectedNotes(bucketId) {
    const allSelectedNotes = this.state.selectedNotes.map(
      (eachSelectedNote) => {
        return this.findNoteFromId(
          eachSelectedNote.noteId,
          eachSelectedNote.bucketId
        );
      }
    );
    this.state.selectedNotes.forEach((note) => {
      this.deleteNoteFromBucket(note.bucketId, note.noteId);
    });
    allSelectedNotes.forEach((eachNote) => {
      this.createNewBucket(bucketId, eachNote);
    });
  }

  addSelectedNotes(bucketId, noteId) {
    if (
      !this.state.selectedNotes.find(
        (eachSelectedNote) => eachSelectedNote.noteId === noteId
      )
    ) {
      this.setState({
        selectedNotes: [...this.state.selectedNotes, { bucketId, noteId }],
      });
    } else {
      const newSelectedNotes = this.state.selectedNotes.filter(
        (eachSelectedNote) => eachSelectedNote.noteId !== noteId
      );
      this.setState({
        selectedNotes: newSelectedNotes,
      });
    }
  }
  createNewBucket(bucketId, note) {
    if (
      this.state.allBuckets.find((eachBucket) => eachBucket.id === bucketId)
    ) {
      const tempAllBucket = this.state.allBuckets;
      tempAllBucket.forEach((eachBucket) => {
        if (eachBucket.id === bucketId) {
          eachBucket.allNotes.push(note);
        }
      });
      this.setState({
        allBuckets: tempAllBucket,
      });
      console.log("added the new note to" + bucketId);
    } else {
      this.setState({
        allBuckets: [
          ...this.state.allBuckets,
          { id: bucketId, allNotes: [note] },
        ],
      });
    }
  }

  deleteNoteFromBucket(bucketId, noteId) {
    let tempAllBucket = this.state.allBuckets;
    let deleteThisBucket = null;
    tempAllBucket.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        eachBucket.allNotes = eachBucket.allNotes.filter(
          (eachNote) => eachNote.id !== noteId
        );
      }
      if (eachBucket.allNotes.length === 0) {
        deleteThisBucket = eachBucket;
      }
    });
    if (deleteThisBucket) {
      tempAllBucket = tempAllBucket.filter(
        (eachBucket) => eachBucket.id !== deleteThisBucket.id
      );
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
            incomingData: null,
          });
        }, 100);
      },
    };
    this.setState({
      incomingData: tempInComingData,
    });
    setTimeout(() => {
      this.setState({
        isModalOpen: true,
      });
    }, 50);
  }

  findNoteFromId(noteId, bucketId) {
    let bucket = null;
    this.state.allBuckets.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        bucket = eachBucket;
      }
    });
    // console.log({ bucket, noteId });
    let ansNote = null;
    if (bucket) {
      bucket.allNotes.forEach((eachNote) => {
        if (eachNote.id === noteId) {
          ansNote = eachNote;
        }
      });
    }
    return ansNote;
  }

  handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result);
    const noteId = result.source.index,
      bucketId = result.source.droppableId;
    // console.log({ noteId, bucketId });
    const newBucketId = result.destination.droppableId;
    // console.log(newBucketId);
    const noteToMove = this.findNoteFromId(noteId, bucketId);
    console.log({ noteToMove });
    this.deleteNoteFromBucket(bucketId, noteId);
    this.createNewBucket(newBucketId, noteToMove);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <div className="container-fluid">
          <Button
            id="add-btn"
            color="warning"
            size="sm"
            onClick={this.toggleModal}
          >
            <span className="fa fa-plus fa-lg"></span>
          </Button>
          <IdeaModal
            open={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            addNoteToBucket={this.createNewBucket}
            allBuckets={this.state.allBuckets}
            inComingData={this.state.incomingData}
          />
          <React.Fragment>
            {this.state.allBuckets.map((eachBucket) => {
              return (
                <div style={{ width: "46%", display: "inline-block" }}>
                  <Droppable key={eachBucket.id} droppableId={eachBucket.id}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Bucket
                          addSelectedNotes={this.addSelectedNotes}
                          key={eachBucket.id}
                          showGroupedData={this.props.showGroupedData}
                          id={eachBucket.id}
                          allNotes={eachBucket.allNotes}
                          allBuckets={this.state}
                          deleteNoteFromBucket={this.deleteNoteFromBucket}
                          editNoteFromBucket={this.editNoteFromBucket}
                          ctrlPressed={this.state.ctrlPressed}
                          selectedNotes={this.state.selectedNotes}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </React.Fragment>
        </div>
      </DragDropContext>
    );
  }
}
