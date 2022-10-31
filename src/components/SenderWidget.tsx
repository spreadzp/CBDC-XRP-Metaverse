import React, { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { getMultisigTokensBalance, getXrpBalance, sendTokens, sendTokensFarther } from '../contexts/XrpContext/generateXrpAccount';
const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

type SenderWidgetProps = {
    sender: string,
    receiver: string
}

function SenderWidget({ sender, receiver }: SenderWidgetProps) {
    const accountBorrower = localStorage.getItem("wallet") || "";
    const [xrpBorrowerAccount, setXrpBorrowerAccount] = useState(accountBorrower.length > 0 ? JSON.parse(accountBorrower): null);
    const cbAccount = localStorage.getItem("New") || "";
    const [cbdcAccount, setCbdcAccount] = useState(cbAccount.length > 0 ? JSON.parse(cbAccount): null);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [alertMessage, setAlert] = useState({ variant: "", message: "", link: "" });

    useEffect(() => {
        if (alertMessage.message) {
            setTimeout(() => {
                setAlert({ variant: "", message: "", link: "" })
            }, 10000)
        }
    }, [alertMessage]);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (xrpBorrowerAccount) {
            console.log('formData :>> ', formData);
            sendTokensCBDC(receiver, formData.amount)
        }
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 3000);
    }

    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const sendTokensCBDC = async (rec: string, amount: number) => {
        await sendTokensFarther(xrpBorrowerAccount.seed, cbdcAccount.classicAddress, rec, amount, setAlert)
    }



    return (
        <>
            <div className="wrapper">
                {submitting &&
                    <div>Submtting Form...</div>}
                {alertMessage.message && <Alert key={alertMessage.variant} variant={alertMessage.variant}>
                    <Alert.Link  href={alertMessage.link}>{alertMessage.message}{alertMessage.link}</Alert.Link>
                </Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formSender">
                        <Form.Label>Sender address</Form.Label>
                        <Form.Control type="text" placeholder="sender" value={cbdcAccount?.classicAddress} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formReceiver">
                        <Form.Label>Receiver address</Form.Label>
                        <Form.Control type="text" placeholder="receiver" value={receiver} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formReceiver">
                        <Form.Label>Amount in tokens to send</Form.Label>
                        <Form.Control type="number" name="amount" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Send tokens
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default SenderWidget;