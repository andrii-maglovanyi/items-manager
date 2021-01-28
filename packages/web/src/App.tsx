import { BrowserRouter as Router } from "react-router-dom";

import { CircularProgress, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import { loginActionCreator, newErrorActionCreator } from "./redux";
import { LOGGED_IN_USER_QUERY } from "./operations/queries";

import { Frame } from "./Frame";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(LOGGED_IN_USER_QUERY, {
    fetchPolicy: "no-cache",
  });

  if (loading)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />;
      </Grid>
    );

  if (data) {
    dispatch(loginActionCreator(data.loggedInUser));
  }

  if (error && error.message !== "Unauthorized") {
    dispatch(newErrorActionCreator(error.message));
  }

  return (
    <Router>
      <Frame />
    </Router>
  );
}

export default App;
