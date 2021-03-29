import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Programs } from "src/pages/client/Programs";
import { Header } from "src/pages/Header";
import { isLoggedInVar } from "src/appolo";
import { useMe } from "src/hooks/useMe";
import { ConfirmEmail } from "src/pages/user/Confirm-email";
import { NotFound } from "src/pages/404";
import { EditProfile } from "src/pages/user/Edit-profile";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Programs />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || error || loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-2xl tracking-wide">Loading ...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.getMyProfile.email !== "" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
