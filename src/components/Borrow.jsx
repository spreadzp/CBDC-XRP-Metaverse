import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import User from './User';

function Borrow({ members }) {
    const [connectedPeerId, setConnectedPeerId] = useState('');
    const messageContainer = [];
    const [message, setMessage] = useState(messageContainer)
    const connectPeer = (peerId) => {
        setConnectedPeerId(peerId);
    }
    const submitBorrow = () => {
        console.log("🚀 ~ file: ChatForm.jsx ~ line 21 ~ submitBorrow ~ message", message)
        let allMessage = [];
        if (message.length > 0) {
            allMessage = message;
        }
        setMessage([])
        allMessage.push({ userPeer: "123", message: "message" })
        setMessage(allMessage);
    }

    const handleChange = event => {
        console.log("🚀 ~ file: ChatForm.jsx ~ line 23 ~ handleChange ~ event", event)
       // setMessage(event.target.value);

        // 👇️ this is the input field itself
        // console.log(event.target);

        // // 👇️ this is the new value of the input
        // console.log(event.target.value);
    };
    return (
        <>
            <div className='chatForm'>
                <ListGroup as="ol" numbered >
                    <h3>Lenders board</h3>
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
                    <User connectedPeerId={connectedPeerId} />
                    <div className="mb-3"  >
                        <Form.Label>You want to borrow</Form.Label>
                        <Form.Control value={JSON.stringify(message) || ""} placeholder="Search..." as="textarea"  onChange={()=> handleChange()} rows={3} />
                    </div>
                    <Form>
                        <div className="mb-3"  >
                            <Form.Label>Connected peer Id</Form.Label>
                            <Form.Control type="text" value={connectedPeerId} placeholder="peerId"  onChange={()=> handleChange()}/>
                        </div>
                        <div className="mb-3"  >
                            <Form.Label>Message to Chat</Form.Label>
                            <Form.Control type="text" placeholder="Message" onChange={()=> handleChange()} />
                        </div>
                        <Button onClick={() => submitBorrow()} variant="primary"  >
                            Submit borrow
                        </Button>
                    </Form>
                </div>
            </div>

        </>
    );
}

export default Borrow;