import React, { Component } from "react";

import "./App.css";
import Bucket from "./components/Bucket";
import Main from "./components/MainComponent";
import Note from "./components/Note";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Note /> */}
        {/* <Bucket /> */}
        
        <Main />
      </div>
    );
  }
}

export default App;
