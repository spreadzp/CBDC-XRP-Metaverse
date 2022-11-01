import React, { useEffect, useState } from 'react';
// import Libp2p from "libp2p";
// import Websockets from "libp2p-websockets";
// import WebRTCStar from "libp2p-webrtc-star";
// import { NOISE } from "libp2p-noise";
// import Mplex from "libp2p-mplex";
// import Bootstrap from "libp2p-bootstrap";
// import KadDHT from "libp2p-kad-dht";
// import PeerId from "peer-id";
// import pushable from "it-pushable";
// import pipe from "it-pipe";
// import { array2str } from '../utils';
// import peerIdListenerJson from './peer-listener'
import { getOrCreatePeerId } from './createPeer';
import useP2p from './useP2p';
const chatProtocol = "/chat/1.0.0";


function P2p({ setMyPeer }) {
    const { state } = useP2p();
    console.log("🚀 ~ file: p2pcommon.jsx ~ line 21 ~ P2p ~ state", state) 
    const [peer, setPeer] = useState('')
    //const [peerId, setPeerId] = useState(null)
    //  const [libp2p, setLibp2p] = useState(null)
    const [started, setStarted] = useState(false)
    // const eventBus = new EventEmitter()
    const peers = [];
    const valPeers = []; //  { peer: any, connection: number }[] 
    let myPeerId = "";
    const otherPeerId = "";
    const otherPeerMultiaddrs = [];
    const otherPeerProtocols = [];
    const otherPeerMultiaddr = "";
    const otherPeerProtoco = "";
    const remotePeerId = "";
    const chatMessage = "";
    const messages = [];
    //let libp2p = null;
    const chatQueue = false;
    const chatProposals = [];
    const proposals = [];
    const creditMessage = "";
    const creditInfo = "";
    const userRole = "";
    const showWindowTx = false;
   
    useEffect(() => {
        
    }, [state]);
    return (
        <>
            <div animation="border" variant="primary">{ state.peerId}</div>
        </>
    );
}

export default P2p;