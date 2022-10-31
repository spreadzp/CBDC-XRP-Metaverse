import React, { useState } from 'react';
import { XrpProvider } from "./contexts/XrpContext";
import Intro from "./components/Intro";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import UploadFn from "./components/UploadFn";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import './App.css';

import NavMenu from './components/NavMenu';
import LandSwitch from './components/LandSwitch';
import { P2pProvider } from './contexts/p2p';
import { Map } from './components/Map';

function App() { 
  const [showSellers, setShowSellers] = useState(false);  

   
  return (
    <XrpProvider>
      <P2pProvider>     
      <section> 
        <Map /> 
      </section>
      </P2pProvider>
    </XrpProvider>
  );
}

export default  App  ; 