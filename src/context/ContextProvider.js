import React, { useContext, useReducer } from "react";
import reducer from "../reducers/reducer";
import { IsUserLoggedIn, UserEmailMFA } from "../types";

const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    userEmail: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const logInUser = () => {
    dispatch({ type: IsUserLoggedIn.LOGGEDIN });
  };

  const logOutUser = () => {
    dispatch({ type: IsUserLoggedIn.LOGGEDOUT });
    dispatch({ type: UserEmailMFA.CLEAREMAIL });
  };

  const saveUserEmailforMFA = (email) => {
    dispatch({
      type: UserEmailMFA.USEREMAIL,
      payload: {
        userEmail: email,
      },
    });
  };

  const getUserEmailforMFA = () => state.userEmail;

  return (
    <AppContext.Provider
      value={{
        ...state,
        logInUser,
        logOutUser,
        saveUserEmailforMFA,
        getUserEmailforMFA,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
