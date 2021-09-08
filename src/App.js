import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  return (
    <div>
      <Main />
    </div>
  );
}
