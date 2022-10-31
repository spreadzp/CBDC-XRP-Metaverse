import { useContext } from "react"; 
import P2pContext from "./P2pContex";

const useP2p = () => useContext(P2pContext);

export default useP2p;