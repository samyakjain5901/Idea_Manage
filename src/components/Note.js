import React from "react";
import { Button } from "reactstrap";

export default function Note({
  id,
  showGroupedData,
  addSelectedNotes,
  editNoteFromBucket,
  deleteNodeFromList,
  bucketId,
  mainContent = "mainContent",
  userName = "userName",
  color,
  ctrlPressed,
  selectedNotes,
}) {
  function deleteNote() {
    deleteNodeFromList(bucketId, id);
  }
  function editNode() {
    editNoteFromBucket(bucketId, id, userName, mainContent, color);
  }

  const currentNoteSelected =
    ctrlPressed &&
    selectedNotes.find((eachSelectedNote) => eachSelectedNote.noteId === id);

  return (
    <div
      onClick={() => {
        if (ctrlPressed) {
          addSelectedNotes(bucketId, id);
        }
      }}
      className="highlight"
      style={{
        backgroundColor: color,
        paddingLeft: "15px",
        border: currentNoteSelected ? "2px solid blue" : "none",
      }}
    >
      {!showGroupedData ? (
        <span className="note-head">{bucketId}</span>
      ) : (
        <span></span>
      )}
      <p>{mainContent}</p>
      <p>- {userName}</p>
      <Button color="link" onClick={deleteNote}>
        <span className="fa fa-trash fa-sm"></span>
      </Button>
      <Button color="link" onClick={editNode}>
        <span className="fa fa-pencil fa-sm"></span>
      </Button>
    </div>
  );
}
