export const SET_SIDEBAR = "SET_SIDEBAR";

export const setSidebar = (isSidebar) => (dispatch) => {
  dispatch({
    type: SET_SIDEBAR,
    payload: isSidebar,
  });
};
