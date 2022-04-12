import { SET_SIDEBAR } from "./actions";

const initalState = {
  isSidebar: false,
};

function sideBarReducer(state = initalState, action) {
  switch (action.type) {
    case SET_SIDEBAR: {
      return { ...state, isSidebar: action.payload };
    }
    default:
      return state;
  }
}

export default sideBarReducer;
