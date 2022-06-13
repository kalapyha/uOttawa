import { IsUserLoggedIn, UserEmailMFA } from "../types";
const reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case IsUserLoggedIn.LOGGEDOUT:
      return { ...state, isAuthenticated: false };
    case IsUserLoggedIn.LOGGEDIN:
      return { ...state, isAuthenticated: true };
    case UserEmailMFA.USEREMAIL:
      return { ...state, userEmail: action.payload };
    case UserEmailMFA.CLEAREMAIL:
      return { ...state, userEmail: "" };
    default:
      throw new Error("Incorrect action type!");
  }
};

export default reducer;
