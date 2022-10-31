import React, { useState } from 'react';
import { XrpProvider, useXrp } from '../contexts/XrpContext';
import ContractEnc from './Demo/ContractEnc';



function Mint() {
  const { state, dispatch } = useXrp();
  console.log("🚀 ~ file: Mint.jsx ~ line 9 ~ Mint ~ state", state)
  const [value, setValue] = useState("?");

  const demo =
    <>
      <div className="contract-container">
        <ContractEnc value={value} />
      </div>
    </>
  return (
    <>

      <div className="demo">
        {
          !state ? <div>NoticeNoArtifact </div> :
            !state.xrpl ? <div>NoticeWrongNetwork </div> :
              demo
        }
      </div>

    </>

  );
}

export default Mint;