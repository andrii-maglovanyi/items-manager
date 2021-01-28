import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { logoutActionCreator, newErrorActionCreator } from "../redux";
import { LOGOUT_MUTATION } from "../operations/mutations";

import { State } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Header = withRouter(({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state: State) => state.auth);

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      dispatch(logoutActionCreator());
    },
    onError: ({ message }) => {
      dispatch(newErrorActionCreator(message));
    },
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {loggedInUser ? (
            <>
              <Typography variant="h6" className={classes.title}>
                Hi, {loggedInUser.fullName}!
              </Typography>
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" className={classes.title}>
                Welcome guest!
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
});
