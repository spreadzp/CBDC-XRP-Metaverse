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
    // const init = async (peer) => {
    //     try {
    //         // const idListener = await lpj.createFromJSON(peerIdListenerJson)
    //         libp2p = await Libp2p.create({
    //             peerId: peer,
    //             addresses: {
    //                 listen: [
    //                     "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
    //                     "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
    //                 ],
    //             },
    //             modules: {
    //                 transport: [Websockets, WebRTCStar],
    //                 connEncryption: [NOISE],
    //                 streamMuxer: [Mplex],
    //                 peerDiscovery: [Bootstrap],
    //                 dht: KadDHT,
    //             },
    //             config: {
    //                 peerDiscovery: {
    //                     [Bootstrap.tag]: {
    //                         enabled: true,
    //                         list: [
    //                             "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    //                             "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    //                             "/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp",
    //                             "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    //                             "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    //                         ],
    //                     },
    //                 },
    //                 dht: {
    //                     enabled: true,
    //                 },
    //             },
    //         });
    //         await libp2p.start()
    //         myPeerId = libp2p.peerId.toB58String();

    //         if (myPeerId) {
    //             console.log("🚀 ~ file: p2pcommon.jsx ~ line 80 ~ init ~  myPeerId", myPeerId)
    //             setPeer(myPeerId)
    //             myPeer(myPeerId)
    //         }

    //         libp2p.handle(chatProtocol, ({ connection, stream, protocol }) => {
    //             remotePeerId = connection.remoteAddr.getPeerId();
    //             pipe(
    //                 stream,
    //                 (source) => {
    //                     return (async function* () {
    //                         for await (const buf of source) yield array2str(buf.slice());
    //                     })();
    //                 },
    //                 async (source) => {
    //                     for await (const msg of source) {
    //                         const msgObj = JSON.parse(msg);
    //                         if (msgObj.type === "message") {
    //                             messages.push(`<h1>${msgObj.data}</h1>`);
    //                         } else if (msgObj.type === "proposal") {
    //                             const script = document.createElement('script');
    //                             let code = msgObj.src.replaceAll(/<\/?[^<>]*>/g, "");
    //                             var inlineScript = document.createTextNode(code);
    //                             script.appendChild(inlineScript);

    //                             document.body.appendChild(script);
    //                             chatProposals.push(msgObj.data)
    //                         } else if (msgObj.type === "creditRequest") {
    //                             const script = document.createElement('script');
    //                             let code = msgObj.src.replaceAll(/<\/?[^<>]*>/g, "");
    //                             var inlineScript = document.createTextNode(code);
    //                             script.appendChild(inlineScript);

    //                             document.body.appendChild(script);
    //                             chatProposals.push(msgObj.data)
    //                             messages.push(`<h1>${JSON.parse(msgObj.data)}</h1>`);
    //                         } else {
    //                             messages.push(`<h1>${msg.toString()}</h1>`);
    //                         }

    //                     }
    //                 }
    //             );
    //         });
    //     } catch (err) {
    //         console.log('errp2p :>> ', err);
    //     }
    // } 

    useEffect(() => {
        
    }, [state]);
    return (
        <>
            <div animation="border" variant="primary">{ state.peerId}</div>
        </>
    );
}

export default P2p;