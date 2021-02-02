import { makeStyles, Paper, TextField } from "@material-ui/core";
import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LOGIN, SERVER } from "../../constants";
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
    fontFamily: "Alegreya Sans, sans-serif",
  },
});

const StyledFlex = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
`;

export const Input = styled(TextField)`
  margin-top: 2px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 20px;
  label {
    color: green;
  }
`;

export default function Login() {
  const user = useSelector((state) => state.authentication.user);
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
    let response = await fetch(SERVER + `/authenticate`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...state }),
    });
    response = await response.json();

    if (response.user) {
      dispatch({ type: LOGIN, payload: { user: response.user } });
    } else alert("couldnt find user");
  };

  if (user) return <Redirect to="/dashboard" />;
  return (
    <StyledFlex>
      <Paper className={classes.paper}>
        <form onSubmit={onSubmitHandler}>
          <Wrapper>
            <h3>Login</h3>
            <Input
              id="outlined-required"
              label="username"
              variant="filled"
              name="username"
              onChange={onChangeHandler}
            />
            <Input
              id="outlined-required"
              label="Password"
              variant="filled"
              type="password"
              name="password"
              onChange={onChangeHandler}
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
    </StyledFlex>
  );
}
