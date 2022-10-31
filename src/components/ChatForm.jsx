import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import User from './User';
import P2p from '../contexts/p2p/p2pcommon';
import ChatWindow from './ChatWindow';
import { useP2p } from '../contexts/p2p';

function ChatForm({ members }) {
    const [connectedPeerId, setConnectedPeerId] = useState('');
    const [myPeerId, setMyPeerId] = useState(null);
    const { state } = useP2p();
    console.log("🚀 ~ file: ChatForm.jsx ~ line 15 ~ ChatForm ~ state", state)
    const messageContainer = [];
    const [message, setMessage] = useState(messageContainer)
    const connectPeer = (peerId) => {
        console.log("🚀 ~ file: ChatForm.jsx ~ line 16 ~ connectPeer ~ peerId", peerId)
        setConnectedPeerId(peerId);
    }
   



    return (
        <>
            <div className='chatForm'>
                <ListGroup as="ol" numbered >
                    {members.map((item, index) => {
                        return (
                            <ListGroup.Item key={index} onClick={() => connectPeer(item.peerId)}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.name}</div>
                                    {item.role}
                                </div>
                                <Badge bg="primary" pill>
                                    {item.rating}
                                </Badge>
                            </ListGroup.Item>)
                    })
                    }
                </ListGroup>
                <div>
                    <User connectedPeerId={state.peerId} />
                    {/* <P2p myPeer={setMyPeerId} /> */}
                    <ChatWindow peerToConnect={connectedPeerId} />
                </div>
            </div>

        </>
    );
}

export default ChatForm;