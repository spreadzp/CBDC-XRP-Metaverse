import { useEffect, useRef, useState } from 'react';
import useP2p from '../contexts/p2p/useP2p';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { array2str, str2array } from '../contexts/utils'; 
import PeerId from "peer-id";
import { peerIdFromString } from '@libp2p/peer-id'
import { pushable } from "it-pushable";
import { pipe } from "it-pipe";
import { State } from '../contexts/p2p/state';
const chatProtocol = "/chat/1.0.0";
type ChatWindowProps = {
    peerToConnect: string
}

function ChatWindow({ peerToConnect }: ChatWindowProps) {
    const { state } = useP2p();
    const refChat = useRef<HTMLTextAreaElement>(null);
    const refCurrentPeerId = useRef<HTMLInputElement>({} as HTMLInputElement);
    const refMessage = useRef<HTMLInputElement>(null);
    let chatQueue: any = null;
    const chatProposals = [];
    const messageContainer: any[] = [];
    const [distPeer, setDistPeer] = useState(peerToConnect)
    const [message, setMessage] = useState(messageContainer)
    const handleChange = (event: any) => {
        console.log("🚀 ~ file: ChatForm.jsx ~ line 23 ~ handleChange ~ event", event)
        // setMessage(event.target.value);: any[]

        // 👇️ this is the input field itself
        // console.log(event.target);

        // // 👇️ this is the new value of the input
        // console.log(event.target.value);
    };
    useEffect(() => {
        setDistPeer("");
        console.log('peerToConnect :>> ', peerToConnect);
        refCurrentPeerId["current"]["value"] = peerToConnect;
        // refCurrentPeerId?.current?.setRangeText(peerToConnect);  
        setDistPeer(peerToConnect);
        console.log('state.peerId :>> ', state.peerId);
        if (peerToConnect !== state.peerId) {
            const tryToFindPeers = async () => {
                try{
                    // let peerId = PeerId.parse(peerToConnect);
                    // let result = await state.libp2p.peerRouting.findPeer(peerId);
                    // console.log("🚀 ~ file: ChatWindow.tsx ~ line 48 ~ tryToFindPeers ~ result", result)
                    // console.log("🚀 ~ file: ChatWindow.tsx ~ line 65 ~ findOtherPeer ~ result", result)
                    // const otherPeerMultiaddrs = result.multiaddrs;
                    // const otherPeerProtocols = state.libp2p.peerStore.protoBook.get(peerId);
                    // console.log("🚀 ~ file: ChatWindow.tsx ~ line 67 ~ findOtherPeer ~ otherPeerProtocols", otherPeerProtocols)
                    // const otherPeerMultiaddr = otherPeerMultiaddrs[0];
                    // console.log("🚀 ~ file: ChatWindow.tsx ~ line 68 ~ findOtherPeer ~ otherPeerMultiaddr", otherPeerMultiaddr)
                    // const otherPeerProtocol = chatProtocol;
                } catch(err) {
                    console.log("🚀 ~ file: ChatWindow.tsx ~ line 55 ~ tryToFindPeers ~ err", err)
                    
                }
            }
            tryToFindPeers()
        }

    }, [peerToConnect]);
    useEffect(() => {
        if (refChat.current) {
            refChat?.current?.focus();
        }
    }, []);
    const sendMessage = () => {
        console.log("🚀 ~ file: ChatForm.jsx ~ line 21 ~ sendMessage ~ message", message)
        let allMessage = [];
        if (message.length > 0) {
            allMessage = message;
        }
        setMessage([])
        allMessage.push({ userPeer: "123", message: "message" })
        setMessage(allMessage);
        if (refChat?.current) {
            refChat?.current?.setRangeText(JSON.stringify(message) || "")
        }
    };



    const connectToPeer = async (peer: string) => {
        let pushArr = null;
        try {
            // let peerId =  PeerId.createFromB58String(peer);

            // try {
            //     const { stream } = await state.libp2p.dialProtocol(peerId, [
            //         "/browser/json"
            //     ]);
            //     pipe([JSON.stringify({ hair: "blue" })], stream);
            // } catch (err) {
            //     console.log(err);
            // }
            // state.libp2p.dialProtocol(peerId, chatProtocol)
            // .then((stream: any) => {
            //     pushArr = pushable();
            //     pipe(
            //         chatQueue,
            //         (source: any) => {
            //             return (async function* () {
            //                 for await (const msg of source) yield str2array(msg);
            //             })();
            //         },
            //         stream
            //     );
            // })
            // .catch((err: any) => {
            //     console.log('err1 :>> ', err);
            // })
            debugger
           try {
            let peerId = PeerId.parse(peerToConnect);
                    let result = await state.libp2p.peerRouting.findPeer(peerId); 
                    const otherPeerMultiaddrs = result.multiaddrs;
                    const otherPeerProtocols = state.libp2p.peerStore.protoBook.get(peerId); 
                    const otherPeerMultiaddr = otherPeerMultiaddrs[0]; 
                    console.log("🚀 ~ file: ChatWindow.tsx ~ line 122 ~ connectToPeer ~ otherPeerMultiaddr", otherPeerMultiaddr)
                    const otherPeerProtocol = chatProtocol;
            //let peerId = PeerId.parse(peerToConnect);
            const { stream, protocol } = await state.libp2p.dialProtocol(peerId, otherPeerProtocol);

            // chatQueue = pushable();
               pipe([JSON.stringify({ hair: "blue" })], stream);
            } catch (err) {
                console.log(err);
            }
            // pipe(
            //     chatQueue,
            //     (source) => {
            //         return (async function* () {
            //             for await (const msg of source) {
            //                 console.log("🚀 ~ file: ChatWindow.tsx ~ line 124 ~ forawait ~ msg", msg)
            //                 yield str2array(msg);}
            //         })();
            //     },
            //     stream
            // );

            // await state.libp2p.handle(chatProtocol, ({ connection, stream, protocol}: any) => {
            //     const remotePeerId = connection.remoteAddr.getPeerId();
            //     console.log("🚀 ~ file: ChatWindow.tsx ~ line 131 ~ state.libp2p.handle ~ remotePeerId", remotePeerId)
            //     console.log("🚀 ~ file: P2pProvider.tsx ~ line 142 ~ node.handle ~ remotePeerId", remotePeerId)
            //     pipe(
            //         stream,
            //         (source: any) => {
            //             return (async function* () {
            //                 for await (const buf of source) yield array2str(buf.slice());
            //             })();
            //         },
            //         async (source: any) => {
            //             for await (const msg of source) {
            //                 const msgObj = JSON.parse(msg);
            //                 console.log("🚀 ~ file: ChatWindow.tsx ~ line 143 ~ forawait ~ msgObj", msgObj)
            //                 // if (msgObj.type === "message") {
            //                 //     messages.push(`<h1>${msgObj.data}</h1>`);
            //                 // } else if (msgObj.type === "proposal") {
            //                 //     const script = document.createElement('script');
            //                 //     let code = msgObj.src.replaceAll(/<\/?[^<>]*>/g, "");
            //                 //     var inlineScript = document.createTextNode(code);
            //                 //     script.appendChild(inlineScript);

            //                 //     document.body.appendChild(script);
            //                 //     chatProposals.push(msgObj.data)
            //                 // } else if (msgObj.type === "creditRequest") {
            //                 //     const script = document.createElement('script');
            //                 //     let code = msgObj.src.replaceAll(/<\/?[^<>]*>/g, "");
            //                 //     var inlineScript = document.createTextNode(code);
            //                 //     script.appendChild(inlineScript);

            //                 //     document.body.appendChild(script);
            //                 //     chatProposals.push(msgObj.data)
            //                 //     messages.push(`<h1>${JSON.parse(msgObj.data)}</h1>`);
            //                 // } else {
            //                 //     messages.push(`<h1>${msg.toString()}</h1>`);
            //                 // }

            //             }
            //         }
            //     );
            // });
        } catch (err) {
            console.log('err2 :>> ', err);
        }
    }

    // const sendMessage = () => {
    //     const dataForSend = {
    //         "type": "message",
    //         "data": this.chatMessage
    //     }

    //     this.chatQueue.push(JSON.stringify(dataForSend));
    //     this.messages.push("< " + this.chatMessage);
    //     this.chatMessage = "";
    // }

    const handleChangePeer = (event: any) => {
        console.log(event.target.value);
        setDistPeer("");
        setDistPeer(event.target.value);
        // refCurrentPeerId.current?.setRangeText("")
        // refCurrentPeerId.current?.setRangeText(event.target.value)
    }
    const handleChangeChat = () => {
        console.log(refChat?.current?.value);
    }
    return (
        <>
            <div id="status"></div>
            <div id="output"></div>
            <div className="mb-3"  >
                <Form.Label>Chat</Form.Label>
                <Form.Control ref={refChat} placeholder="Search..." as="textarea" rows={3} onChange={() => handleChangeChat()} />
            </div>
            <div>
                <div className="mb-3"  >
                    <Form.Label>Connected peer Id</Form.Label>
                    <input type="text" onChange={handleChangePeer} />
                    <Form.Control ref={refCurrentPeerId} type="text" placeholder="peerId" />
                    {distPeer && <Button onClick={() => connectToPeer(distPeer)} variant="primary"  >
                        Connect to peer
                    </Button>}
                </div>
                <div>{JSON.stringify(chatQueue)}</div>
                <div className="mb-3"  >
                    <Form.Label>Message to Chat</Form.Label>

                    <Form.Control ref={refMessage} type="text" placeholder="Message" />
                </div>
                <Button onClick={() => sendMessage()} variant="primary"  >
                    Submit
                </Button>

            </div>
        </>
    );
}

export default ChatWindow;
