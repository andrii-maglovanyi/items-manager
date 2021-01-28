import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import { loginActionCreator, newErrorActionCreator } from "../redux";
import { useDispatch } from "react-redux";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../operations/mutations";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Login() {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      dispatch(loginActionCreator(login));
    },
    onError: ({ message }) => {
      dispatch(newErrorActionCreator(message));
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      dispatch(loginActionCreator(signup));
    },
    onError: ({ message }) => {
      dispatch(newErrorActionCreator(message));
    },
  });

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    formState.login ? login() : signup();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={`/logo.png`} width="25" height="25" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {formState.login ? "Login" : "Sign Up"}
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {!formState.login && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formState.firstName}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        firstName: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={formState.lastName}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        lastName: e.target.value,
                      })
                    }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    password: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            {formState.login ? "Login" : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() =>
                  setFormState({
                    ...formState,
                    login: !formState.login,
                  })
                }
              >
                {formState.login
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
