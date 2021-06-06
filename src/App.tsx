import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppView from "./components/home/AppView";
import { SinaDatasetApp } from "./components/dataset_app/SinaDataset";

const apps = [new SinaDatasetApp()];

function App() {
  return <AppView apps={apps} />;
}

export default App;
