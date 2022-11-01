import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { configIssuer, configReceiverTokensAccount, createTrustLine, generateXrpAccount, sendTokens } from '../contexts/XrpContext/generateXrpAccount';
import AccountWidget from './AccountWidget';
import HideShow from './HideShow';
import Loader from './Loader';
import MultisigWidget from './MultisigWidget';
import RevokeWidget from './RevokeWidget';
import TaxWidget from './TaxWidget';

function CentralBank() {
    const account = localStorage.getItem("walletBank");
    const [xrpBankAccount, setXrpBankAccount] = useState(account);
    const nAccount = localStorage.getItem("New");
    const [newAccount, setNewAccount] = useState(nAccount);
    const adminAccount = localStorage.getItem("Admin");
    const [xrpAdminAccount, setXrpAdminAccount] = useState(adminAccount);
    const businessAccount = localStorage.getItem("Business");
    const [xrpBusinessAccount, setXrpBusinessAccount] = useState(businessAccount);
    const accountBorrower = localStorage.getItem("wallet");
    const [xrpBorrowerAccount, setXrpBorrowerAccount] = useState(accountBorrower);
    const [isLoading, setIsLoading] = useState(false);
    const newAcc = JSON.parse(newAccount);
    const adminAcc = JSON.parse(xrpAdminAccount);
    const borrowerAcc = JSON.parse(xrpBorrowerAccount);
    const genXRPAccount = async (accountName) => {
        setIsLoading(true);
        await generateXrpAccount(accountName);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);

    }
    const getAddress = (lSDData) => {
        const data = JSON.parse(lSDData)

        return data ? data.classicAddress : "";
    }

    const generateCbdcAccount = async () => {
        if (xrpAdminAccount && xrpBorrowerAccount) {
            await generateXrpAccount(`CBDC_${newAcc.classicAddress}_${adminAcc.classicAddress}_${borrowerAcc.classicAddress}`);
        }
    }

    const cbdcAccount = () => (
        <div className='account-widget'>
            {nAccount && <MultisigWidget accountName={"CBDC multisig account"} address={getAddress(newAccount)} signers={[getAddress(adminAccount), getAddress(accountBorrower)]} />}
            {isLoading && xrpBorrowerAccount && adminAccount && newAccount ? <Loader /> : <>
                <Button onClick={() => generateCbdcAccount()} variant="primary">
                    Generate CBDC account
                </Button>
                <TaxWidget cbdcAccount={getAddress(newAccount)} />
                <RevokeWidget cbdcAccount={getAddress(newAccount)} accountToRevoke={getAddress(accountBorrower)} />
            </>
            }
        </div>
    );

    const getBankWidget = () => (
        <div className='account-widget'>
            {xrpBankAccount && <MultisigWidget accountName={"walletBank"} address={getAddress(xrpBankAccount)} signers={null} />}
            {isLoading ? <Loader /> : <Button onClick={() => genXRPAccount("walletBank")} variant="primary"  >
                Generate Bank account
            </Button>}
            {xrpBankAccount && <Button onClick={() => configIssuer()} variant="primary"  >
                Config account for issue tokens
            </Button>}
            {xrpBankAccount && <Button onClick={() => sendTokens("walletBank", newAcc.classicAddress, 10000)} variant="primary"  >
                Send tokens
            </Button>}
        </div>);

        const createCBDCWidget = () => (  <div className='account-widget'>
        {nAccount && <AccountWidget accountName={"New account for using as CBDC"} address={getAddress(newAccount)} />}
        {isLoading && xrpBorrowerAccount && adminAccount ? <Loader /> : <Button onClick={() => genXRPAccount("New")} variant="primary"  >
            Generate account for using as CBDC
        </Button>}
        {newAccount && <Button onClick={() => configReceiverTokensAccount("New")} variant="primary"  >
            Config account for receive tokens
        </Button>}
        {newAccount && <Button onClick={() => createTrustLine("New")} variant="primary"  >
            CreateTrustLine
        </Button>}
    </div>);

const getAdminWidget = () => ( <div className='account-widget'>
{adminAccount && <AccountWidget accountName={"Admin account"} address={getAddress(adminAccount)} />}
{isLoading && xrpBorrowerAccount ? <Loader /> : <Button onClick={() => genXRPAccount("Admin")} variant="primary"  >
    Generate Admin account
</Button>}
</div> )
    return (
        <>
            <HideShow component={getBankWidget} buttonName={"Show Bank info"} nameSection={`Bank Account info `} />

            <HideShow component={cbdcAccount} buttonName={"Show CBDC info"} nameSection={`Client account info `} />
            <HideShow component={createCBDCWidget} buttonName={"New account for using with CBDC"} nameSection={`To create account `} />
           
            <HideShow component={getAdminWidget} buttonName={"Admin account"} nameSection={`Admin account info `} />
          

            {/* <div className='account-widget'>
                {xrpBusinessAccount && <AccountWidget accountName={"Business account"} address={getAddress(xrpBusinessAccount)} />}
                {isLoading && xrpBusinessAccount ? <Loader /> : <Button onClick={() => genXRPAccount("Business")} variant="primary"  >
                    Generate Business account
                </Button>}
            </div> */}
        </>
    );
}

export default CentralBank;