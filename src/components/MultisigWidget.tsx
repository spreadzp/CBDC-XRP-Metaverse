import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { getMultisigTokensBalance, getXrpBalance } from '../contexts/XrpContext/generateXrpAccount';

type MultisigWidget = {
    accountName: string, address: string, signers?: string[]
}
function MultisigWidget({ accountName, address, signers }: MultisigWidget) {

    const [connectedPeerId, setConnectedPeerId] = useState('');
    const [balance, setBalance] = useState(null);
    const [balanceTokens, setBalanceTokens] = useState(null);
    const [nameTokens, setNameTokens] = useState(null);
    const getBalData = (info: any) => {
        setBalanceTokens(info?.lines[0]?.balance)
        setNameTokens(info?.lines[0]?.currency)
        console.log("🚀 ~ file: MultisigWidget.jsx ~ line 37 ~ getBalData ~ info", info)

    }
    useEffect(() => {
        const getBalance = async (add: string) => {
            return await getXrpBalance(add)
        }
        getBalance(address)
            .then((bal: any) => {
                setBalance(bal)
            })
            .catch(err => console.log('err :>>  ', err));

    }, [address])

    useEffect(() => {
        const getTokensBalance = async (add: string) => {
            return await getMultisigTokensBalance(add, getBalData)
        }
        getTokensBalance(address)
            .then(bal => {
                console.log('tokens :>> ', bal);

            })
            .catch(err => console.log('err :>> ', err));

    }, [address, getBalData])


    return (
        <>
            <div className='chatForm'>
                <div>
                    <div className="mb-3"  >
                        <div>{accountName}</div>
                        <Card body  > {address} </Card>
                    </div>
                    {signers && signers.length > 0 && signers.map((signer, ind) =>
                        (<div key={ind} className="mb-3" >
                            <div>{ind === 0? "Admin": "Signer"} {ind + 1}</div>
                            <Card body  > {signer} </Card>
                        </div>
                        ))
                    }
                    <Card body >Balance in XRP {balance} </Card>
                    <Card body >Balance in Tokens {balanceTokens} {nameTokens} </Card>
                </div>
            </div>
        </>
    );
}

export default MultisigWidget;