import { useContext } from "react";
import XrpContext from "./XrpContext";

const useXrp = () => useContext(XrpContext);

export default useXrp;
