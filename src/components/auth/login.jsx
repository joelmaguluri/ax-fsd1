import { makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { INIT_USER } from "../../constants";
import { ButtonWrapper, ColorButton, Wrapper } from "../clients/addUsers";

const useStyles = makeStyles({
  paper: {
    width: "500px",
    marginTop: "10%",
    padding: "50px",
    zIndex: "0",
    overflow: "hidden",
    position: "relative",
    boxShadow:
      "0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",
    borderRadius: "16px",
    alignSelf: "center",
  },
});

export default function Login() {
  let user = useSelector((state) => state.authentication.user);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(
      "https://uviz4022j1.execute-api.us-east-1.amazonaws.com/authenticate/" +
        `${state.username},${state.password}`,
      {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    console.log(response);
    if (response.user) {
      dispatch({ type: INIT_USER, payload: { user: response.user } });
    } else alert("Invalid Password");
  };
  if (user) return <Redirect to="/dashboard" />;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <Paper className={classes.paper}>
        <h4 style={{ marginLeft: "24px" }}>Login</h4>
        <form onSubmit={onSubmitHandler}>
          <Wrapper>
            <TextField
              id="outlined-required"
              label="username"
              variant="filled"
              style={{
                width: "100%",
                paddngTop: "20px",
                paddingBottom: "20px",
                color: "green",
              }}
              onChange={onChangeHandler}
              name="username"
            />
            <TextField
              id="outlined-required"
              label="Password"
              variant="filled"
              style={{
                width: "100%",
                paddngTop: "20px",
                paddingBottom: "20px",
              }}
              type="password"
              onChange={onChangeHandler}
              name="password"
            />
          </Wrapper>
          <ButtonWrapper>
            <ColorButton
              type="submit"
              variant="outlined"
              size="large"
              className={classes.margin}
            >
              Login
            </ColorButton>
          </ButtonWrapper>
        </form>
      </Paper>
    </div>
  );
}
