import React, { useState } from 'react';
import Loader from './Loader';
import Button from 'react-bootstrap/Button';
import { configReceiverTokensAccount, createTrustLine, generateXrpAccount } from '../contexts/XrpContext/generateXrpAccount';
import AccountWidget from './AccountWidget';

function AccountGen() {
    const account = localStorage.getItem("wallet") || "";
    const [xrpAccount, setXrpAccount] = useState(account);
    const [isLoading, setIsLoading] = useState(false);
    const genXRPAccount = async () => {
        setIsLoading(true);
        await generateXrpAccount("wallet");
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);

    }
    const getAddress = (lSDData) => {
        const data = JSON.parse(lSDData)

        return data ? data.classicAddress : "";
    }
    // const generateCbdcAccount = (xrpAccount) => {

    // }
    // const accountInfo = () => (
    //     <><h2>Your wallet address</h2>
    //         <h3>{JSON.parse(account).classicAddress}</h3>
    //     </>
    // )
    return (
        <>
            <div className='account-widget'>
                {xrpAccount && <AccountWidget accountName={"Owner account"} address={getAddress(xrpAccount)} />}
                {isLoading && xrpAccount ? <Loader /> : <Button onClick={() => genXRPAccount("wallet")} variant="primary"  >
                    Generate Owner account
                </Button>}
              
            </div>

        </>
    );
}

export default AccountGen;