import { produce } from "immer";
import { SET_USER_CREDENTIALS } from "../types";

const initialState = {
    userName: "",
    loginName: "",
    email: "",
    avatar: "",
    company: "",
    bio: "",
    accessToken: ""
  };
  
const authReducer = produce((state, action) => {
    switch (action.type) {
      case SET_USER_CREDENTIALS: {
        return {
          ...state,
          userName: action.payload.userName,
          loginName: action.payload.loginName,
          email: action.payload.email,
          avatar: action.payload.avatar,
          company: action.payload.company,
          bio: action.payload.bio,
          accessToken: action.payload.accessToken
        };
      }
      default: {
        return state;
      }
    }
  }, initialState);

export default authReducer;

  