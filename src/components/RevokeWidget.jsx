import React, { useEffect, useReducer, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { revokeSigner, sendTokensFarther } from '../contexts/XrpContext/generateXrpAccount';



function RevokeWidget({ cbdcAccount, accountToRevoke }) {
    const admAccount = localStorage.getItem("Admin");
    const [adminAccount, setAdminAccount] = useState(JSON.parse(admAccount) || null);
    const bAccount = localStorage.getItem("walletBank");
    const [submitting, setSubmitting] = useState(false);
    const [alertMessage, setAlert] = useState({ variant: "", message: "", link: "" });

    useEffect(() => {
        if (alertMessage.message) {
            setTimeout(() => {
                setAlert({ variant: "", message: "", link: "" })
            }, 10000)
        }
    }, [alertMessage]);

    const handleSubmit = event => {
        event.preventDefault();
        if (adminAccount) {
            setSubmitting(true);
            setTimeout(async () => {
                await revokeSigner(accountToRevoke, `CBDC_${cbdcAccount}_${adminAccount.classicAddress}_${accountToRevoke}`, setAlert);
                setSubmitting(false);
            }, 3000);
        }
    }

    

    return (
        <>
            {alertMessage.message && <Alert key={alertMessage.variant} variant={alertMessage.variant}>
                    <Alert.Link target="_blank" href={alertMessage.link}>{alertMessage.message}{alertMessage.link}</Alert.Link>
                </Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formSender">
                    <Form.Label>CBDC address</Form.Label>
                    <Form.Control type="text" placeholder="sender" value={cbdcAccount} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSender">
                    <Form.Label>Revoke signer address</Form.Label>
                    <Form.Control type="text" placeholder="sender" value={accountToRevoke} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Revoke signer
                </Button>
            </Form>
        </>
    );
}

export default RevokeWidget;