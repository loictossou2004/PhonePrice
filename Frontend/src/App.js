import React from 'react';
// import './Login.css'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Choice from './components/Choice';
import Clients from './components/Clients';


function App() {
  return (
    <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/choice" element={<Choice/>}/>
          <Route path="/clients" element={<Clients/>}/>
        </Routes>
    </React.Fragment>
  );
}

export default App;