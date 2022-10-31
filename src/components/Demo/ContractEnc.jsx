import { useState } from "react";
import React from 'react';
import useXrp from "../../contexts/XrpContext/useXrp";

function ContractEnc({ setValue }) {
  const { state: { xrpl } } = useXrp();
  const [inputValue, setInputValue] = useState("");
  const [owner, setOwner] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    // const value = await contractEN.methods.getTokenInfoLastOwner(1).call({ from: accounts[0] });
    // setValue(value);
  };

  const getOwner = async () => {
    // const ownerData = await contractEN.methods.owner().call({ from: accounts[0] });
    // setOwner(ownerData);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    // const newValue = parseInt(inputValue);  
    // const owner = await contractEN.methods.owner().call({ from: accounts[0] });
    // console.log("🚀 ~ file: ContractEnc.jsx ~ line 30 ~ write ~ owner", owner)
    // console.log('accounts[1] :>> ', accounts[0]); 
    // console.log("🚀 ~ file: ContractEnc.jsx ~ line 29 ~ write ~ newValue", newValue) 
    // const gas = await contractEN.methods
    // .mint(accounts[0], newValue, "tokenURI_", "decryptKeyForOwner")
    // .estimateGas({ from: accounts[0]  });
    // console.log("🚀 ~ file: ContractEnc.jsx ~ line 43 ~ write ~ gas", gas)
    // const increasedGas = Math.round(Number(gas) * 1.25 )
    //   console.log("🚀 ~ file: ContractEnc.jsx ~ line 44 ~ write ~ increasedGas", increasedGas)
    //   const tx = await contractEN.methods.mint(accounts[0], newValue, "tokenURI_", "decryptKeyForOwner").send({ from: accounts[0], gas: increasedGas })
    //   console.log("🚀 ~ file: ContractEnc.jsx ~ line 32 ~ write ~ tx", tx) 
    //   if(tx) {
    //     await waitForTxToBeMined(tx)
    //   }
    
  };

//   async function waitForTxToBeMined (txHash) {
//     let txReceipt
//     while (!txReceipt) {
//       try {
//         txReceipt = await window.web3.getTransactionReceipt(txHash)
//       } catch (err) {
//         return indicateFailure(err)
//       }
//     }
//      indicateSuccess(txReceipt)
//   } 
//  function indicateFailure(err) {
// console.log('err :>> ', err);
//   }
//  function indicateSuccess(tx ) {
//   setSuccess(tx)
//   }

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>
      <button onClick={getOwner}>
       getOwner
      </button> 

    </div>
  );
}

export default ContractEnc;
