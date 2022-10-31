const actions = {
  init: "INIT",
};

interface initialState   {
  xrpl: null
};
interface setXrpAction {
  type: any;
  data: any;
}
const reducer = (state: initialState, action: setXrpAction) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  actions,
  reducer
};
