import React from "react";
import { withRouter, Switch } from "react-router-dom";

import PublicRoute from "../../routes/PublicRoute";
import PrivateRoute from "../../routes/PrivateRoute";
import MainLayout from "../../components/Layout/Layout";
import StaticLayout from "../../components/Layout/Layout/Static";

import {
  AsyncHome,
  AsyncLoginForm,
  AsyncDashboard,
  AsyncRegisterPage,
  AsyncAccounts,
  AsyncAccount,
  AsyncTransactions,
  AsyncTransaction,
  AsyncStatement,
  AsyncQuickWizard
} from "./AsyncComponent";

const App = () => (
  <React.Fragment>
    <Switch>
      <PublicRoute exact path="/" layout={StaticLayout} component={AsyncHome} />
      <PublicRoute
        exact
        path="/login"
        layout={StaticLayout}
        component={AsyncLoginForm}
      />
      <PublicRoute
        exact
        path="/signup"
        layout={StaticLayout}
        component={AsyncRegisterPage}
      />
      <PrivateRoute
        exact
        path="/dashboard"
        layout={MainLayout}
        component={AsyncDashboard}
      />
      <PrivateRoute
        exact
        path="/accounts"
        layout={MainLayout}
        component={AsyncAccounts}
      />
      <PrivateRoute
        exact
        path="/accounts/:id"
        layout={MainLayout}
        component={AsyncAccount}
      />
      <PrivateRoute
        exact
        path="/transactions"
        layout={MainLayout}
        component={AsyncTransactions}
      />
      <PrivateRoute
        exact
        path="/transactions/:id"
        layout={MainLayout}
        component={AsyncTransaction}
      />
      <PrivateRoute
        exact
        path="/statement"
        layout={MainLayout}
        component={AsyncStatement}
      />
      <PrivateRoute
        exact
        path="/jump-start"
        layout={MainLayout}
        component={AsyncQuickWizard}
      />
    </Switch>
  </React.Fragment>
);

export default withRouter(App);
