import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { getXrpBalance } from '../contexts/XrpContext/generateXrpAccount';

type AccountWidgetProps = {
    accountName: string , address: string 
}
function AccountWidget({ accountName, address }: AccountWidgetProps) {
    const [connectedPeerId, setConnectedPeerId] = useState('');
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        const getBalance = async (add: string) => {
            return await getXrpBalance(add)
        }
        getBalance(address)
        .then((bal: any) => {
            console.log('b :>> ', bal);
            setBalance(bal)
        })
        .catch(err => console.log('err :>> ', err));

    }, [address])

    return (
        <>
            <div className='chatForm'>
                <div>
                    <div className="mb-3"  >
                        <div>{accountName}</div> 
                        <Card body> {address} </Card>
                    </div>
                    <div className="mb-3" >
                        <div>Balance in XRP</div>
                        <Card body> {balance} </Card> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountWidget;