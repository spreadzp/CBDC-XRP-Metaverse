import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import App from './App';
import Assets from "./components/Assets";
import CentralBank from "./components/CentralBank"; 
import Land from "./components/Land";
import Mint from "./components/Mint";
import NavMenu from "./components/NavMenu";
import UploadFn from "./components/UploadFn";
import { P2pProvider } from "./contexts/p2p";
import { XrpProvider } from "./contexts/XrpContext";
import './index.css';

const ReactDOM = require('react-dom/client');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <NavMenu />
    <XrpProvider>     
    <P2pProvider>  
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="upload-ipfs" element={<UploadFn />} />
      <Route path="mint" element={<Mint  />} />        
      <Route path="assets" element={<Assets />} />
      <Route path="land/:room" element={<Land />} />
      <Route path="bank" element={<CentralBank />} />
      
    </Routes>
    </P2pProvider>   
    </XrpProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
