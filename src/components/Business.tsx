
import { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import { configReceiverTokensAccount, createTrustLine, generateXrpAccount } from '../contexts/XrpContext/generateXrpAccount';
import MultisigWidget from './MultisigWidget';


function Business() {
    const businessAccount = localStorage.getItem("Business") || "";
    const [xrpBusinessAccount, setXrpBusinessAccount] = useState(businessAccount.length > 0 ? JSON.parse(businessAccount): null); 
    const genXRPAccount = async (accountName: string) => {
        // setIsLoading(true);
        await generateXrpAccount(accountName);
        setTimeout(() => {
            // setIsLoading(false);
        }, 5000);

    }
    return (
        <>        
            {xrpBusinessAccount && <MultisigWidget accountName={"Business"} address={xrpBusinessAccount?.classicAddress}/>}
            {!xrpBusinessAccount && <Button onClick={() => genXRPAccount("Business")} variant="primary"  ></Button>}
            <Button onClick={() => createTrustLine("Business")} variant="primary"  >
                CreateTrustLine
            </Button>
            <Button onClick={() => configReceiverTokensAccount("Business")} variant="primary"  >
                Config account for receive tokens
            </Button>
        </>

    );
}

export default Business;