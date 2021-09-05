import React from "react";
import Note from "./Note";

export default function Bucket({ showGroupedData,id, allNotes, allBuckets, deleteNoteFromBucket, editNoteFromBucket }) {
  if(!showGroupedData){
    return(

      <React.Fragment>
    {allNotes &&
            allNotes.map((eachNote) => {
              return <Note key={eachNote.id} bucketId={id} id={eachNote.id} mainContent={eachNote.body} userName={eachNote.name} color={eachNote.color} allBuckets={allBuckets} deleteNodeFromList={deleteNoteFromBucket} editNoteFromBucket={editNoteFromBucket} />;
            })}
    </React.Fragment>
  )
  }
  
  return (
      <div className="group" style={{display:showGroupedData?"inline-block":"contents",width:!showGroupedData?"2px":"auto"}} >
        {console.log({showGroupedData})}
        <div className="head-box">
            <h4 style={{display:showGroupedData?"inline-block":"none"}} >{id}</h4>
        </div>
        <div style={{display:showGroupedData?"block":"inline"}}>
          {allNotes &&
            allNotes.map((eachNote) => {
              return <Note key={eachNote.id} bucketId={id} id={eachNote.id} mainContent={eachNote.body} userName={eachNote.name} color={eachNote.color} allBuckets={allBuckets} deleteNodeFromList={deleteNoteFromBucket} editNoteFromBucket={editNoteFromBucket} />;
            })}
        </div>
      </div>
  );
}
