
import { AccountSetAsfFlags, AccountSetTfFlags, Client, Transaction, TxResponse, Wallet, multisign, SubmitMultisignedRequest, decode } from 'xrpl'


const currency_code = "CBDC"
const connectToXrpClient = async () => {
    try {
        const net =  "wss://xls20-sandbox.rippletest.net:51233"; // "wss://s.devnet.rippletest.net:51233"; // "wss://s.altnet.rippletest.net:51233"; // "wss://xls20-sandbox.rippletest.net:51233"

        const client = new Client(net, { timeout: 50000 });
        await client.connect();
        return client;

    } catch (err) {
        return Promise.reject()
    }
}

export async function getXrpBalance(address: string) {
    const client = await connectToXrpClient();
    if (client) {
        return await client.getXrpBalance(address)
    }
}
export async function configIssuer() {
    const client = await connectToXrpClient();
    const bankDataLs = localStorage.getItem("walletBank");
    if (client && bankDataLs) {
        const walletBank = Wallet.fromSeed(JSON.parse(bankDataLs).seed);
        const bank_settings_tx: Transaction = {
            "TransactionType": "AccountSet",
            "Account": walletBank.classicAddress,
            "TransferRate": 0,
            "TickSize": 5,
            "Domain": "6578616D706C652E636F6D", // "example.com"
            "SetFlag": AccountSetAsfFlags.asfDefaultRipple,
            // Using tf flags, we can enable more flags in one transaction
            "Flags": (AccountSetTfFlags.tfDisallowXRP |
                AccountSetTfFlags.tfRequireDestTag)
        }

        const cst_prepared = await client.autofill(bank_settings_tx)
        const cst_signed = walletBank.sign(cst_prepared)
        console.log("Sending cold address AccountSet transaction...")
        const cst_result = (await client.submitAndWait(cst_signed.tx_blob))
        if (cst_result) {
            console.log("🚀 ~ file: generateXrpAccount.ts ~ line 38 ~ configIssuer ~ cst_result", cst_result)
            if (cst_result?.result.meta?.toString() == "tesSUCCESS") {
                console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`)
            } else {
                throw `Error sending transaction: ${cst_result}`
            }
        }
        client.disconnect()
    }
}

export async function sendTokens(senderName: string, receiverAddress: string, amount: number) {
    const client = await connectToXrpClient();
    const bankDataLs = localStorage.getItem(`${senderName}`) || "";
    const wallet = Wallet.fromSeed(JSON.parse(bankDataLs).seed);
   
    if (client && receiverAddress) {
        const issue_quantity = `${amount}`;
        const send_token_tx: Transaction = {
            "TransactionType": "Payment",
            "Account": wallet.address,
            "Amount": {
                "currency": currency_code,
                "value": issue_quantity,
                "issuer": wallet.address
            },
            "Destination": receiverAddress,
            "DestinationTag": 1 // Needed since we enabled Require Destination Tags
            // on the hot account earlier.
        }

        const pay_prepared = await client.autofill(send_token_tx)
        const pay_signed = wallet.sign(pay_prepared)
        console.log(`Sending ${issue_quantity} ${currency_code} to ${receiverAddress}...`)
        const pay_result = await client.submitAndWait(pay_signed.tx_blob)
        if (pay_result.result.meta?.toString() == "tesSUCCESS") {
            console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`)
            await getBankTokensBalance(wallet.address, receiverAddress);
            await getMultisigTokensBalance(receiverAddress, console.log)
        } else {
            console.log(`Error sending transaction: ${pay_result.result.meta?.toString()}`)
        }
        client.disconnect();
    }
}

export async function sendTokensFarther(senderSeed: string, cbdcAddress: string, receiverAddress: string, amount: number, setAlert: any) {
    try{
        const client = await connectToXrpClient();
        const bankDataLs = localStorage.getItem("walletBank");
        const issuerAddress = JSON.parse(bankDataLs || "").classicAddress;
        const admin = localStorage.getItem("Admin");
        const aWallet = JSON.parse(admin || "");
        const wallet = Wallet.fromSeed(senderSeed); 
        if (client && receiverAddress) {
            const issue_quantity = `${amount}`;
            const send_token_tx: Transaction = {
                "TransactionType": "Payment",
                "Account": cbdcAddress,
                "Amount": {
                    "currency": currency_code,
                    "value": issue_quantity,
                    "issuer": issuerAddress
                },
                "Destination": receiverAddress,
                "DestinationTag": 1 
            }
    
            const pay_prepared = await client.prepareTransaction(send_token_tx, 1);
            const pay_signed = wallet.sign(pay_prepared, true)
            const multisigned = multisign([pay_signed.tx_blob]);
            console.log("🚀 ~ file: generateXrpAccount.ts ~ line 117 ~ sendTokensFarther ~ multisigned", decode(multisigned))
            console.log(`Sending ${issue_quantity} ${currency_code} to ${receiverAddress}...`)
            const multisignedRequest: SubmitMultisignedRequest = {
                command: 'submit_multisigned',
                tx_json: decode(multisigned) as unknown as Transaction
            }
            const submitResponse = await client.request(multisignedRequest);
            if (submitResponse.result.engine_result == "tesSUCCESS") {
                console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`)
                await getBankTokensBalance(wallet.address, receiverAddress);
                await getMultisigTokensBalance(receiverAddress, console.log)
                setAlert({variant: 'primary', message: `Transaction succeeded: `, link: `https://testnet.xrpl.org/transactions/${pay_signed.hash}`})
            } else {
                setAlert({variant: 'danger', message: submitResponse.result.engine_result_message })
            }
            client.disconnect();
        }
    } catch(err) {
        console.log('err :>> ', JSON.stringify(err));
    }
}

export async function getBankTokensBalance(bankAddress: string, clientAddress: string) {
    const client = await connectToXrpClient();
    console.log("Getting cold address balances...")
    const cold_balances = await client.request({
        command: "gateway_balances",
        account: bankAddress,
        ledger_index: "validated",
        hotwallet: [clientAddress]
    })
    console.log(JSON.stringify(cold_balances.result, null, 2))
    client.disconnect();

}
export async function getMultisigTokensBalance(address: string, cb: any) {
    const client = await connectToXrpClient();
    try {
        console.log("Getting hot address balances...")
        const hot_balances = await client.request({
            command: "account_lines",
            account: address,
            ledger_index: "validated"
        })
        console.log(hot_balances.result)

        cb(hot_balances.result);

    } finally {
        client.disconnect();
    }

}

export async function configReceiverTokensAccount(walletName: string) {
    const client = await connectToXrpClient();
    const msDataLs = localStorage.getItem(walletName);
    if (client && msDataLs) {
        try{

            const wallet = Wallet.fromSeed(JSON.parse(msDataLs).seed);
            const hot_settings_tx: Transaction = {
                "TransactionType": "AccountSet",
                "Account": wallet.address,
                "Domain": "6578616D706C652E636F6D", // "example.com"
                // enable Require Auth so we can't use trust lines that users
                // make to the hot address, even by accident:
                "SetFlag": AccountSetAsfFlags.asfRequireAuth,
                "Flags": (AccountSetTfFlags.tfDisallowXRP |
                    AccountSetTfFlags.tfRequireDestTag)
            }
    
            const hst_prepared = await client.autofill(hot_settings_tx)
            const hst_signed = wallet.sign(hst_prepared)
            console.log("Sending hot address AccountSet transaction...")
            const hst_result = await client.submitAndWait(hst_signed.tx_blob)
            if (hst_result.result.meta?.toString() == "tesSUCCESS") {
                console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`)
            } else {
                console.log(`Error sending transaction: ${JSON.stringify(hst_result)}`)
            }
            client.disconnect()
        }catch(err) {
            console.log('err configReceiverTokensAccount:>> ', err);
        }
    }
}

export async function createTrustLine(walletName: string) {
    const client = await connectToXrpClient();
    const msDataLs = localStorage.getItem(walletName);
    const bankDataLs = localStorage.getItem("walletBank") || "";
    if (client && msDataLs) {
        try{

            const wallet = Wallet.fromSeed(JSON.parse(msDataLs).seed); 
            const trust_set_tx: Transaction = {
                "TransactionType": "TrustSet",
                "Account": wallet.address,
                "LimitAmount": {
                    "currency": currency_code,
                    "issuer": JSON.parse(bankDataLs).classicAddress,
                    "value": "10000000000" // Large limit, arbitrarily chosen
                }
            }
    
            const ts_prepared = await client.autofill(trust_set_tx)
            const ts_signed = wallet.sign(ts_prepared)
            console.log("Creating trust line from hot address to issuer...")
            const ts_result = await client.submitAndWait(ts_signed.tx_blob)
            if (ts_result.result.meta?.toString() == "tesSUCCESS") {
                console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`)
            } else {
                console.log(`Error sending transaction: ${JSON.stringify(ts_result)}`)
            }
            client.disconnect();
        }catch(err) {
            console.log('err@ :>> ', err);
        }
    }
}

export async function revokeSigner(addressToRevoke: string, walletName: string, setAlert: any) {
    let wallet = localStorage.getItem(walletName)
    const client = await connectToXrpClient();

    if (wallet) {
        
        if (walletName.includes("CBDC")) {
            //const walletBank = localStorage.getItem("walletBank") || ""
            const accountForMultisig = localStorage.getItem("New") || ""
            const wName = walletName.split("_").filter(item => item !== addressToRevoke);
            const signerListSet: Transaction = {
                TransactionType: 'SignerListSet',
                Account: wName[1],
                SignerEntries: [
                    {
                        SignerEntry: {
                            Account: wName[2],
                            SignerWeight: 1,
                        },
                    }
                ],
                SignerQuorum: 1,
            }
            const ts_prepared = await client.autofill(signerListSet, 1)
            //const bankWallet = Wallet.fromSeed(JSON.parse(walletBank).seed);
            const n = Wallet.fromSeed(JSON.parse(accountForMultisig).seed) // || {} as Wallet
            const msig_signed = n.sign(ts_prepared)
            console.log("🚀 ~ file: generateXrpAccount.js ~ line 53 ~ generateXrpAccount ~ msig_signed", msig_signed)
            // console.log("🚀 ~ file: generateXrpAccount.js ~ line 52 ~ generateXrpAccount ~ n", n)
            //console.log("🚀 ~ file: generateXrpAccount.js ~ line 46 ~ generateXrpAccount ~ ts_signed", ts_signed)
            const response = await client.submit(msig_signed.tx_blob, { wallet: n })
            console.log("🚀 ~ file: generateXrpAccount.js ~ line 51 ~ generateXrpAccount ~ response", response)
            localStorage.removeItem(walletName)
            localStorage.setItem(`RESERVED_${walletName[1]}_${walletName[2]}`, JSON.stringify({account: walletName[1], signers:[walletName[1]]}), )
            setAlert({variant: 'primary', message: `Transaction succeeded: `, link: `https://testnet.xrpl.org/transactions/${response.result.tx_json.hash}`})
            // const cst_result = await client.submitAndWait(ts_prepared, n)
            // console.log("🚀 ~ file: generateXrpAccount.js ~ line 53 ~ generateXrpAccount ~ cst_result", cst_result)
            // try to multisign
            // const accountSet = {
            //     TransactionType: 'AccountSet',
            //     Account: this.wallet.classicAddress,
            //     Domain: convertStringToHex('example.com'),
            // }
            // const accountSetTx = await client.autofill(accountSet, 2)
        } 
        client.disconnect()
    } else {
        client.disconnect()
        console.log('first', wallet)
        return wallet;
    }
}
export async function generateXrpAccount(walletName: string) {
    let wallet = localStorage.getItem(walletName)
    const client = await connectToXrpClient();

    if (!wallet) {
        
        if (walletName.includes("CBDC")) {
            //const walletBank = localStorage.getItem("walletBank") || ""
            const accountForMultisig = localStorage.getItem("New") || ""
            const wName = walletName.split("_");
            const signerListSet: Transaction = {
                TransactionType: 'SignerListSet',
                Account: wName[1],
                SignerEntries: [
                    {
                        SignerEntry: {
                            Account: wName[2],
                            SignerWeight: 1,
                        },
                    },
                    {
                        SignerEntry: {
                            Account: wName[3],
                            SignerWeight: 1,
                        },
                    },
                ],
                SignerQuorum: 1,
            }
            const ts_prepared = await client.autofill(signerListSet, 2)
            //const bankWallet = Wallet.fromSeed(JSON.parse(walletBank).seed);
            const n = Wallet.fromSeed(JSON.parse(accountForMultisig).seed) // || {} as Wallet
            const msig_signed = n.sign(ts_prepared)
            console.log("🚀 ~ file: generateXrpAccount.js ~ line 53 ~ generateXrpAccount ~ msig_signed", msig_signed)
            // console.log("🚀 ~ file: generateXrpAccount.js ~ line 52 ~ generateXrpAccount ~ n", n)
            //console.log("🚀 ~ file: generateXrpAccount.js ~ line 46 ~ generateXrpAccount ~ ts_signed", ts_signed)
            const response = await client.submit(msig_signed.tx_blob, { wallet: n })
            console.log("🚀 ~ file: generateXrpAccount.js ~ line 51 ~ generateXrpAccount ~ response", response)
            localStorage.setItem(walletName, JSON.stringify({signer1: wName[2], signer2: wName[3]}))
            // const cst_result = await client.submitAndWait(ts_prepared, n)
            // console.log("🚀 ~ file: generateXrpAccount.js ~ line 53 ~ generateXrpAccount ~ cst_result", cst_result)
            // try to multisign
            // const accountSet = {
            //     TransactionType: 'AccountSet',
            //     Account: this.wallet.classicAddress,
            //     Domain: convertStringToHex('example.com'),
            // }
            // const accountSetTx = await client.autofill(accountSet, 2)
        } else {
            let faucetHost = null;
            faucetHost = "faucet-nft.ripple.com";

            const my_wallet = (await client.fundWallet(null, { faucetHost })).wallet
            // console.log("🚀 ~ file: MapLand.js ~ line 150 ~ createAccount ~ my_wallet", my_wallet)
            window.localStorage.setItem("net", 'standby');
            window.localStorage.setItem(walletName, JSON.stringify(my_wallet));
            // const my_balance = client.getXrpBalance(my_wallet.address)
            // console.log("🚀 ~ file: MapLand.js ~ line 151 ~ createAccount ~ my_balance", my_balance)

            return my_wallet
        }
    } else {
        client.disconnect()
        console.log('first', wallet)
        return wallet;
    }
}