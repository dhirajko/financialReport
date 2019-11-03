import React, { Component, createContext } from "react";
import axios from "axios";
import { isAuthenticated } from "../../../utils/jwtUtil";
import {
  API_URL,
  JWT_TOKEN,
  LOGGED_IN_USER_EMAIL,
  USER_ID,
  USER_IS_ACTIVE,
  USER_IS_ADMIN,
  USER_IS_STAFF
} from "../../../constants/appConfig";

import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage
} from "../../../utils/storageUtil";
import history from "../../../utils/history";

const AuthContext = createContext({
  user: {},
  isAuthenticated: false
});

const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {
  state = {
    user: getLocalStorage("user") || {},
    isAuthenticated: isAuthenticated() || false
  };

  login = ({ email, password }) => {
    return axios
      .post(
        `${API_URL}api/login`,
        { email, password },
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        if (response.data.status_code === 200) {
          setLocalStorage(JWT_TOKEN, response.data.data.token);
          setLocalStorage(USER_ID, response.data.data.id);
          setLocalStorage(LOGGED_IN_USER_EMAIL, response.data.data.email);
          setLocalStorage(USER_IS_ADMIN, response.data.data.isAdmin);
          setLocalStorage(USER_IS_ACTIVE, response.data.data.isActive);
          setLocalStorage(USER_IS_STAFF, response.data.data.isStaff);
          this.setState({ isAuthenticated: true, user: response.data.data });
          history.push("/");
          return response;
        }
      });
  };

  logout = () => {
    clearLocalStorage("token");
    clearLocalStorage(JWT_TOKEN);
    clearLocalStorage(USER_ID);
    clearLocalStorage(LOGGED_IN_USER_EMAIL);
    clearLocalStorage(USER_IS_ADMIN);
    clearLocalStorage(USER_IS_STAFF);
    clearLocalStorage(USER_IS_ACTIVE);
    this.setState({ user: {}, isAuthenticated: false });
  };

  register = ({ email, password, name }) => {
    console.log(email,password,name);
    
   return axios.post(
      API_URL + "api/user",
      {
        email: email,
        password: password,
        name: name,
        isAdmin: false,
        isStaff: false,
        isActive: false
      },
      { headers: { Accept: "application/json" } }
    );
  };

  goToDashboard = () => {
    history.push({ pathname: "/" });
  };

  render() {
    return (
      <AuthContext.Provider
        {...this.props}
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
          register: this.register,
          goToDashboard: this.goToDashboard
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthProvider, AuthConsumer, AuthContext };

export const withContext = Component => {
  return props => {
    return (
      <AuthContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AuthContext.Consumer>
    );
  };
};
