import React, { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { sendTokensFarther } from '../contexts/XrpContext/generateXrpAccount';

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}
type TaxWidgetProps = {
    cbdcAccount: string
}
function TaxWidget({ cbdcAccount}: TaxWidgetProps ) {
    const admAccount = localStorage.getItem("Admin") || "";
    const [adminAccount, setAdminAccount] = useState(admAccount.length > 0 ? JSON.parse(admAccount): null);
    const bAccount = localStorage.getItem("walletBank") || "";
    const [bankAccount, setBankAccount] = useState(bAccount.length > 0 ?  JSON.parse(bAccount): null);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [alertMessage, setAlert] = useState({ variant: "", message: "", link: "" });


    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (adminAccount) {
            console.log('@@@formData :>> ', formData);
            sendTokensCBDC(adminAccount.seed, bankAccount.classicAddress, formData.amount)
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

    const sendTokensCBDC = async (seed: string, rec: string, amount: number) => {
        await sendTokensFarther(seed, cbdcAccount, rec, amount, setAlert)
    }

    return (
        <>
            {alertMessage?.message &&
                <Alert key={alertMessage?.variant} variant={alertMessage?.variant}> 
                    <Alert.Link  href={alertMessage?.link}>{alertMessage?.message}{alertMessage?.link}</Alert.Link>
                </Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formSender">
                    <Form.Label>Tax from address</Form.Label>
                    <Form.Control type="text" placeholder="sender" value={cbdcAccount} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSender">
                    <Form.Label>Tax destination address</Form.Label>
                    <Form.Control type="text" placeholder="sender" value={bankAccount?.classicAddress} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formReceiver">
                    <Form.Label>Amount tokens to subtract tax </Form.Label>
                    <Form.Control type="number" name="amount" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Subtract tax
                </Button>
            </Form>
        </>
    );
}

export default TaxWidget;