// const actions = {
//     init: "INIT",
// };
import {Libp2p} from "libp2p";
export type State = {
  libp2p: Libp2p;
  peerId: string;
}
const initialState: State = {
  libp2p: {} as Libp2p,
  peerId: ""
};
enum ActionKind {
  init = "INIT"
}
type Action = {
  type: ActionKind,
  payload: any
}

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.init:
      return { ...state, ...payload };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  ActionKind,
  initialState,
  reducer
};