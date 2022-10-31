import React, { useReducer, useCallback, useEffect } from "react"; 
import XrpContext from "./XrpContext";
import { reducer, actions  } from "./state";
import xrpl, {Transaction, TxResponse, Wallet} from 'xrpl'

function XrpProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, actions);

  const init = useCallback(
    async ( ) => {
 
      if (xrpl) { 
      
        try {
          
      
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { xrpl }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try { 
        init( );
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    // debugger
    // const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init( );
    };

    // events.forEach(e => window.ethereum.on(e, handleChange));
    // return () => {
    //   events.forEach(e => window.ethereum.removeListener(e, handleChange));
    // };
  }, [init, xrpl]);

  return (
    <XrpContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </XrpContext.Provider>
  );
}

export default XrpProvider;
