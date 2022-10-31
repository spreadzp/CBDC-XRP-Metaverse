import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandSwitch({ room }) {
    const navigate = useNavigate();

    const moveToLand = (room) => navigate(`/land/${room}`);
    return (
        <>
            <h2>LandSwitch{room}</h2>
            <button onClick={() => moveToLand(room)}>Land {room}</button>
        </> 
    );
}

export default LandSwitch;