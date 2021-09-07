import React from "react";
import { Button } from "reactstrap";

export default function Note({ id, showGroupedData, editNoteFromBucket, deleteNodeFromList, bucketId, mainContent = "mainContent", userName = "userName", color }) {
  function deleteNote() {
    deleteNodeFromList(bucketId, id);
  }
  function editNode() {
    editNoteFromBucket(bucketId, id, userName, mainContent, color);
  }
  return (
    <div className="highlight" style={{backgroundColor: color, paddingLeft: '15px'}}>
      {!showGroupedData ? <span className="note-head">{bucketId}</span>: <span></span>}
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
