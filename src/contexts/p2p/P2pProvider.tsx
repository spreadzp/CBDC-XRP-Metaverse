import { useReducer, useEffect, useState } from "react";
//import { create } from 'libp2p' 
import { reducer, ActionKind, initialState } from "./state";
// import { NOISE } from "libp2p-noise"; 
// import Bootstrap from "libp2p-bootstrap";
// import KadDHT from "libp2p-kad-dht"; 
// import WebRTCStar from "libp2p-webrtc-star"; 
// import Mplex from "libp2p-mplex";
// import Websockets from "libp2p-websockets"; 
import { getOrCreatePeerId } from './createPeer';
import P2pContext from "./P2pContex";
// import Libp2p from "libp2p"; 
// import { pipe } from "it-pipe"; 
// import PeerID from "peer-id"; 
import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { webRTCStar } from '@libp2p/webrtc-star'
import { Noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { bootstrap } from '@libp2p/bootstrap'
import { array2str } from "../utils";
import { stdinToStream, streamToConsole } from "./stream";
import { createFromJSON } from "@libp2p/peer-id-factory";
const chatProtocol = "/chat/1.0.0";

function P2pProvider({ children }: any) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [peer, setPeer] = useState('')
    const [initPpeer, setInitPeer] = useState({} as any)
    const [peerId, setPeerId] = useState({} as any)
    const [started, setStarted] = useState(false)
    const [id, setId] = useState("");
    const peers = new Set();
    const [foundPeers, setFoundPeers] = useState(peers);

    // useEffect(() => {
    //     const idListener = async () => await createFromJSON({
    //         "id": "QmcrQZ6RJdpYuGvZqD5QEHAv6qX4BrQLJLQPQUrTrzdcgm",
    //         "privKey": "CAASqAkwggSkAgEAAoIBAQDLZZcGcbe4urMBVlcHgN0fpBymY+xcr14ewvamG70QZODJ1h9sljlExZ7byLiqRB3SjGbfpZ1FweznwNxWtWpjHkQjTVXeoM4EEgDSNO/Cg7KNlU0EJvgPJXeEPycAZX9qASbVJ6EECQ40VR/7+SuSqsdL1hrmG1phpIju+D64gLyWpw9WEALfzMpH5I/KvdYDW3N4g6zOD2mZNp5y1gHeXINHWzMF596O72/6cxwyiXV1eJ000k1NVnUyrPjXtqWdVLRk5IU1LFpoQoXZU5X1hKj1a2qt/lZfH5eOrF/ramHcwhrYYw1txf8JHXWO/bbNnyemTHAvutZpTNrsWATfAgMBAAECggEAQj0obPnVyjxLFZFnsFLgMHDCv9Fk5V5bOYtmxfvcm50us6ye+T8HEYWGUa9RrGmYiLweuJD34gLgwyzE1RwptHPj3tdNsr4NubefOtXwixlWqdNIjKSgPlaGULQ8YF2tm/kaC2rnfifwz0w1qVqhPReO5fypL+0ShyANVD3WN0Fo2ugzrniCXHUpR2sHXSg6K+2+qWdveyjNWog34b7CgpV73Ln96BWae6ElU8PR5AWdMnRaA9ucA+/HWWJIWB3Fb4+6uwlxhu2L50Ckq1gwYZCtGw63q5L4CglmXMfIKnQAuEzazq9T4YxEkp+XDnVZAOgnQGUBYpetlgMmkkh9qQKBgQDvsEs0ThzFLgnhtC2Jy//ZOrOvIAKAZZf/mS08AqWH3L0/Rjm8ZYbLsRcoWU78sl8UFFwAQhMRDBP9G+RPojWVahBL/B7emdKKnFR1NfwKjFdDVaoX5uNvZEKSl9UubbC4WZJ65u/cd5jEnj+w3ir9G8n+P1gp/0yBz02nZXFgSwKBgQDZPQr4HBxZL7Kx7D49ormIlB7CCn2i7mT11Cppn5ifUTrp7DbFJ2t9e8UNk6tgvbENgCKXvXWsmflSo9gmMxeEOD40AgAkO8Pn2R4OYhrwd89dECiKM34HrVNBzGoB5+YsAno6zGvOzLKbNwMG++2iuNXqXTk4uV9GcI8OnU5ZPQKBgCZUGrKSiyc85XeiSGXwqUkjifhHNh8yH8xPwlwGUFIZimnD4RevZI7OEtXw8iCWpX2gg9XGuyXOuKORAkF5vvfVriV4e7c9Ad4Igbj8mQFWz92EpV6NHXGCpuKqRPzXrZrNOA9PPqwSs+s9IxI1dMpk1zhBCOguWx2m+NP79NVhAoGBAI6WSoTfrpu7ewbdkVzTWgQTdLzYNe6jmxDf2ZbKclrf7lNr/+cYIK2Ud5qZunsdBwFdgVcnu/02czeS42TvVBgs8mcgiQc/Uy7yi4/VROlhOnJTEMjlU2umkGc3zLzDgYiRd7jwRDLQmMrYKNyEr02HFKFn3w8kXSzW5I8rISnhAoGBANhchHVtJd3VMYvxNcQb909FiwTnT9kl9pkjhwivx+f8/K8pDfYCjYSBYCfPTM5Pskv5dXzOdnNuCj6Y2H/9m2SsObukBwF0z5Qijgu1DsxvADVIKZ4rzrGb4uSEmM6200qjJ/9U98fVM7rvOraakrhcf9gRwuspguJQnSO9cLj6",
    //         "pubKey": "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLZZcGcbe4urMBVlcHgN0fpBymY+xcr14ewvamG70QZODJ1h9sljlExZ7byLiqRB3SjGbfpZ1FweznwNxWtWpjHkQjTVXeoM4EEgDSNO/Cg7KNlU0EJvgPJXeEPycAZX9qASbVJ6EECQ40VR/7+SuSqsdL1hrmG1phpIju+D64gLyWpw9WEALfzMpH5I/KvdYDW3N4g6zOD2mZNp5y1gHeXINHWzMF596O72/6cxwyiXV1eJ000k1NVnUyrPjXtqWdVLRk5IU1LFpoQoXZU5X1hKj1a2qt/lZfH5eOrF/ramHcwhrYYw1txf8JHXWO/bbNnyemTHAvutZpTNrsWATfAgMBAAE="
    //     });
    //     setInitPeer(idListener)
    // }, []);

    // useEffect(() => {
    //     if (initPpeer) {
    //         init(initPpeer).then(peer => console.log('peer :>> ', peer))
    //     }
    // }, [initPpeer]);
    // const [remotePeerID, setRemote] = useState("");


    // const receive = (stream: any) => {
    //     pipe(stream.source, async function (source: any) {
    //         for await (const msg of source) {
    //             console.log(msg.toString("utf8"));
    //         }
    //     });
    // };

    useEffect(() => {
        console.log('peerId.toString()', peerId.toString())
        if (peerId.toString() === '[object Object]') {
            console.info('Getting our PeerId')
            getOrCreatePeerId().then((pi) => {
                console.log("🚀 ~ file: p2pcommon.jsx ~  line 154 ~ getOrCreatePeerId ~ pi", pi)
                if(pi) {
                    setPeerId(pi)
                }

                return pi
            })
                .then((peerId) => {
                    console.log("🚀 ~ file: P2pProvider.jsx ~ line 75 ~ .then ~ peerId",  peerId, peerId?.toString())
                    return init(peerId )
                })
                .then(node => console.log('node@ :>> ', node))

        }
    }, [])

    const init = async (peer: any) => {
        try {
            //options.peerId = peer;
            const wrtcStar = webRTCStar()

            // Create our libp2p node
            const node = await createLibp2p({
                // peerId: await peer,
                addresses: {
                    // Add the signaling server address, along with our PeerId to our multiaddrs list
                    // libp2p will automatically attempt to dial to the signaling server so that it can
                    // receive inbound connections from other peers
                    listen: [
                        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
                    ]
                },
                transports: [
                webSockets(),
               wrtcStar.transport
                ],
                connectionEncryption: [() => new Noise()],
                streamMuxers: [mplex()],
                peerDiscovery: [
                    wrtcStar.discovery,
                    bootstrap({
                        list: [
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
                        ]
                    })
                ]
            })
        
            node.connectionManager.addEventListener('peer:connect', (evt) => {
                const connection = evt.detail
                console.log('connected to: ', connection.remotePeer.toString())
            })

            // Handle messages for the protocol
            await node.handle('/chat/1.0.0', async ({ stream }) => {
                // Send stdin to the stream
                stdinToStream(stream)
                // Read the stream and output to console
                streamToConsole(stream)
            })

           

            // Output listen addresses to the console
            console.log('Listener ready, listening on:')
            node.getMultiaddrs().forEach((ma) => {
                console.log(ma.toString())
            })
            // node.addEventListener('peer:discovery', (evt) => {
            //     const peer = evt.detail
            //     const peersBefore = foundPeers;
            //     peersBefore.add(peer.id.toString())
            //     setFoundPeers(peersBefore)
            //     let fPeers = ""
            //     foundPeers.forEach(p => {fPeers +=`Found peer: ${p} \n`})
            //     output.textContent = `${fPeers}`
            //     // dial them when we discover them
            //     node.dial(evt.detail.id).catch(err => {
            //         console.log("🚀 ~ file: P2pProvider.tsx ~ line 153 ~ node.dial ~ err", err)
            //         log(`Could not dial ${evt.detail.id}`)
            //     })
            // })

            // // Listen for new connections to peers
            // node.connectionManager.addEventListener('peer:connect', (evt) => {
            //     const connection = evt.detail
            //     log(`Connected to ${connection.remotePeer.toString()}`)
            // })

            // // Listen for peers disconnecting
            // node.connectionManager.addEventListener('peer:disconnect', (evt) => {
            //     const connection = evt.detail
            //     log(`Disconnected from ${connection.remotePeer.toString()}`)
            // })
 
            await node.start()
            //   status.innerText = 'libp2p started!'
            //   log(`libp2p id is ${libp2p.peerId.toString()}`)
            // try {
            //     await node.stop();
            // } catch (err) { }
            // node = await create(options);
            // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@", node);
            // await node.start();

            setId(node.peerId.toCID.toString());
            console.log("listening on: " + node.peerId.toString());
            console.log("🚀 ~ file: P2pProvider.tsx ~ line 255 ~ init ~ node", node)
            // // UI elements
            const status = document.getElementById('status') || { textContent: "" }
            const output = document.getElementById('output') || { textContent: "" }

            output.textContent = ''

            const log = (txt: string) => {
                let fPeers = ""
                //    foundPeers.forEach(p => {fPeers +=`Found peer: ${p} \n`})
                //     output.textContent = `${fPeers}`
            }

            // console.log("🚀 ~ file: P2pProvider.tsx ~ line 267 ~ init ~ node.connectionManager.connections.values()", node.connectionManager._peerValues)


            console.log('node.peerId.toString() :>> ', node.peerId.toString());
            setPeer(node.peerId.toCID().toString())
            // myPeer(myPeerId)
            dispatch({
                type: ActionKind.init,
                payload: { libp2p: node, peerId: node.peerId.toString() }
            });


            //     node.handle(chatProtocol, ({ connection, stream}) => {
            //         remotePeerId = connection.remoteAddr.getPeerId() || "";
            //         console.log("🚀 ~ file: P2pProvider.tsx ~ line 142 ~ node.handle ~ remotePeerId", remotePeerId)
            //         pipe(
            //             stream,
            //             (source: any) => {
            //                 return (async function* () {
            //                     for await (const buf of source) yield array2str(buf.slice());
            //                 })();
            //             },
            //             async (source: any) => {
            //                 for await (const msg of source) {
            //                     const msgObj = JSON.parse(msg);
            //                     if (msgObj.type === "message") {
            //                         messages.push(`<h1>${msgObj.data}</h1>`);
            //                     } else if (msgObj.type === "proposal") {
            //                         const script = document.createElement('script');
            //                         let code = msgObj.src.replaceAll(/<\/?[^<>]*>/g, "");
            //                         var inlineScript = document.createTextNode(code);
            //                         script.appendChild(inlineScript);

            //                         document.body.appendChild(script);
            //                         chatProposals.push(msgObj.data)
            //                     } else if (msgObj.type === "creditRequest") {
            //                         const script = document.createElement('script');
            //                         let code = msgObj.src.replaceAll(/<\/?[^<>]*>/g, "");
            //                         var inlineScript = document.createTextNode(code);
            //                         script.appendChild(inlineScript);

            //                         document.body.appendChild(script);
            //                         chatProposals.push(msgObj.data)
            //                         messages.push(`<h1>${JSON.parse(msgObj.data)}</h1>`);
            //                     } else {
            //                         messages.push(`<h1>${msg.toString()}</h1>`);
            //                     }

            //                 }
            //             }
            //         );
            //     });
        } catch (err) {
            console.log('errp2p :>> ', err);
        }
    }

    /**
     * Leverage use effect to act on state changes
     */

    return (
        <P2pContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </P2pContext.Provider>
    );
}

export default P2pProvider;
