import React from "react";
import Note from "./Note";
import { Draggable } from "react-beautiful-dnd";
import CustomDrag from "react-drag-element";
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
              <CustomDrag dragItemId={eachNote.id} dragId={"draggable-area-id"}>
                <div style={{ width: "170px", display: "inline-block" }}>
                  <Draggable
                    key={eachNote.id}
                    draggableId={eachNote.id}
                    index={eachNote.id}
                  >
                    {(provided) => (
                      <div
                        id="draggable-area-id"
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
              </CustomDrag>
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
