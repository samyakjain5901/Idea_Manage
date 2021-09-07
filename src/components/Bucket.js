import React from "react";
import Note from "./Note";
import { Draggable } from "react-beautiful-dnd";
// import OutsideWrapper from "./OutsideWrapper";

export default function Bucket({
  showGroupedData,
  id,
  allNotes,
  allBuckets,
  deleteNoteFromBucket,
  editNoteFromBucket,
}) {
  if (!showGroupedData) {
    return (
      <React.Fragment>
        {/* <OutsideWrapper showGroupedData={this.props.showGroupedData}> */}
        {allNotes &&
          allNotes.map((eachNote) => {
            return (
              <div style={{ width: "175px", display: "inline-block" }}>
                <Draggable
                  key={eachNote.id}
                  draggableId={eachNote.id}
                  index={eachNote.id}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Note
                        showGroupedData={showGroupedData}
                        bucketId={id}
                        id={eachNote.id}
                        mainContent={eachNote.body}
                        userName={eachNote.name}
                        color={eachNote.color}
                        allBuckets={allBuckets}
                        deleteNodeFromList={deleteNoteFromBucket}
                        editNoteFromBucket={editNoteFromBucket}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            );
          })}
        {/* </OutsideWrapper> */}
      </React.Fragment>
    );
  }
  return (
    <div
      className="group"
      style={{
        display: showGroupedData ? "inline-block" : "contents",
        width: !showGroupedData ? "2px" : "auto",
      }}
    >
      <div className="text-center">
        <span
          className="head-box"
          style={{ display: showGroupedData ? "inline-block" : "none" }}
        >
          {id}
        </span>
      </div>
      <div style={{ display: showGroupedData ? "block" : "inline" }}>
        {allNotes &&
          allNotes.map((eachNote) => {
            return (
              <div style={{ width: "175px", display: "inline-block" }}>
                <Draggable
                  key={eachNote.id}
                  draggableId={eachNote.id}
                  index={eachNote.id}
                >
                  {(provided) => (
                    <div
                      key={eachNote.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Note
                        showGroupedData={showGroupedData}
                        bucketId={id}
                        id={eachNote.id}
                        mainContent={eachNote.body}
                        userName={eachNote.name}
                        color={eachNote.color}
                        allBuckets={allBuckets}
                        deleteNodeFromList={deleteNoteFromBucket}
                        editNoteFromBucket={editNoteFromBucket}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            );
          })}
      </div>
    </div>
  );
}
