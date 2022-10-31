
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import MultisigWidget from './MultisigWidget';


function CbdcAccount() {
    const ownAccount = localStorage.getItem("wallet") || "";
    const [ownerAccount, setOwnerAccount] = useState(ownAccount.length > 0 ? JSON.parse(ownAccount): null);
    const nAccount = localStorage.getItem("New") || "";
    const [newAccount, setNewAccount] = useState(nAccount.length > 0 ? JSON.parse(nAccount): null);
    const admAccount = localStorage.getItem("Admin") || "";
    const [adminAccount, setAdminAccount] = useState(admAccount.length > 0 ? JSON.parse(admAccount): null);
    return (
        <>
            <MultisigWidget accountName={"CBDC account"} address={newAccount?.classicAddress} signers={[ownerAccount?.classicAddress, adminAccount?.classicAddress]} />
        </>

    );
}

export default CbdcAccount;