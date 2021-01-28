import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { removeErrorActionCreator } from "./redux";

import { State } from "./types";

import { Items } from "./pages/Items";
import { Header } from "./components/Header";
import { Login } from "./pages/Login";

import { PrivateRoute } from "./router/PrivateRoute";

export function Frame() {
  const history = useHistory();
  const dispatch = useDispatch();

  const error = useSelector((state: State) => state.error);
  const loggedInUser = useSelector((state: State) => state.auth);

  useEffect(() => {
    history.push(loggedInUser ? "/" : "/login");
  }, [history, loggedInUser]);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          isAuthenticated={Boolean(loggedInUser)}
          exact
          path="/"
          component={Items}
        />
      </Switch>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => dispatch(removeErrorActionCreator())}
      >
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
