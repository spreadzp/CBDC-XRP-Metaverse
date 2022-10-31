 
import { useState } from 'react';
import AccountGen from './accountGen';
import Business from './Business';
import CbdcAccount from './CbdcAccount';
import SenderWidget from './SenderWidget';
 

function Assets() {
  const businessAccount = localStorage.getItem("Business") || "";
  const [xrpBusinessAccount, setXrpBusinessAccount] = useState(businessAccount.length > 0 ? JSON.parse(businessAccount): null);
  const nAccount = localStorage.getItem("New") || "";
  const [newAccount, setNewAccount] = useState(nAccount.length > 0 ? JSON.parse(nAccount): null);
  return (
    <>
      <AccountGen />
      <CbdcAccount />
      <Business />
      <SenderWidget sender={newAccount?.classicAddress} receiver={xrpBusinessAccount?.classicAddress} />
    </>
 
  );
}

export default Assets;