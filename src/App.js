import React from 'react';
import { Routes, Route } from "react-router-dom"
import Search from "./components/Search"
import CardDetails from "./components/CardDetails"

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Search/> } />
        <Route path="card/:cardID" element={ <CardDetails/> } />
      </Routes>
    </div>
  );
}

export default App
