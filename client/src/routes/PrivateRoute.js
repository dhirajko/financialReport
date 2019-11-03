import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import SideBarContainer from "../containers/sideBar/SideBarContainer";

import { AuthConsumer } from "../components/Layout/Header/AuthContext";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };
  return (
    <AuthConsumer>
      {({ isAuthenticated }) => (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <Layout>
                <SideBarContainer
                  sidebar={show}
                  onSetSidebarOpen={toggle}
                ></SideBarContainer>

                <div style={show ? { marginLeft: 240 } : { marginLeft: 80 }}>
                  <Component {...props} />
                </div>
              </Layout>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )}
    </AuthConsumer>
  );
};

export default PrivateRoute;
