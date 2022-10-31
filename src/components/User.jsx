import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function User({ connectedPeerId }) {
    const pathname = window.location.pathname;
    const [userPeerId, setUserPeerId] = useState("PEERIDfgsdgad");

    return (
        <>
            <Card>
                <Card.Header>{userPeerId}</Card.Header>
                <Card.Body>
                    <Card.Title>Your peer ID</Card.Title>
                    <Card.Text>
                        {connectedPeerId}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default User;