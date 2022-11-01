import { useEffect, useRef, useState } from 'react';
import useP2p from '../contexts/p2p/useP2p';
import { multiaddr } from '@multiformats/multiaddr'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { array2str, str2array } from '../contexts/utils';
import PeerId from "peer-id";
import { peerIdFromString } from '@libp2p/peer-id'
import { pushable } from "it-pushable";
import { pipe } from "it-pipe";
import { State } from '../contexts/p2p/state';
import { stdinToStream, streamToConsole } from '../contexts/p2p/stream';
const chatProtocol = "/chat/1.0.0";
type ChatWindowProps = {
    peerToConnect: string
}

function ChatWindow({ peerToConnect }: ChatWindowProps) {
    const { state } = useP2p();
    const walletAccount = localStorage.getItem("wallet") || "";
    const [xrpAccount, setAccount] = useState(walletAccount.length > 0 ? JSON.parse(walletAccount): null); 
    const refChat = useRef<HTMLTextAreaElement>(null);
    const refCurrentPeerId = useRef<HTMLInputElement>({} as HTMLInputElement);
    const refCbdc = useRef<HTMLInputElement>(null);
    let chatQueue: any = null;
    const chatProposals = [];
    const messageContainer: any[] = [];
    const [distPeer, setDistPeer] = useState(peerToConnect)
    const [message, setMessage] = useState(messageContainer)
    const [reqAmount, setReqAmount] = useState(0)
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
        // if (peerToConnect !== state.peerId) {
        //     const tryToFindPeers = async () => {
        //         try { 
        //         } catch (err) {
        //             console.log("🚀 ~ file: ChatWindow.tsx ~ line 55 ~ tryToFindPeers ~ err", err) 
        //         }
        //     }
        //     tryToFindPeers()
        // }

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
           
            const listenerMa = multiaddr(`/ip4/127.0.0.1/tcp/10333/p2p/${peer}`)
            
            state.libp2p.dialProtocol(listenerMa, '/chat/1.0.0')
            .then((stream: any) => {  
                if (stream) {
                    stdinToStream(stream, xrpAccount?.classicAddress, reqAmount, "credit" );
                    console.log('Dialer dialed to listener on protocol: /chat/1.0.0')
            
                }
            })
          
        } catch (err) {
            console.log('err2 :>> ', err);
        }
    }

  

    const handleChangePeer = (event: any) => {
        console.log(event.target.value);
        setDistPeer("");
        setDistPeer(event.target.value); 
    }

    const handleChangeAmount = (event: any) => {
        setReqAmount(0);
        setReqAmount(+event.target.value)
    }
    const handleChangeChat = () => {
        console.log(refChat?.current?.value);
    }
 

    return (
        <>
            <div className="mb-3"  >
                <Form.Label>Chat</Form.Label>
                <Form.Control ref={refChat} placeholder="Search..." as="textarea" rows={3} onChange={() => handleChangeChat()} />
            </div>
       
            <div>
            {distPeer && <div className="mb-3"  >
                    <Form.Label>Required amount CBDC</Form.Label>

                    <Form.Control ref={refCbdc} onChange={handleChangeAmount} type="number" placeholder="10000" />
                </div>}
                <div className="mb-3"  >
                    <Form.Label>Connected peer Id</Form.Label>
                    {/* <input type="text" onChange={handleChangePeer} /> */}
                    <Form.Control ref={refCurrentPeerId} type="text"  onChange={handleChangePeer}  placeholder="peerId" />
                    {distPeer && <Button onClick={() => connectToPeer(distPeer)} variant="primary"  >
                        Connect to peer
                    </Button>}
                </div>
                {/* <div>{JSON.stringify(chatQueue)}</div> */}
                
                {/* <Button onClick={() => sendMessage()} variant="primary"  >
                    Submit
                </Button> */}

            </div>
        </>
    );
}

export default ChatWindow;
