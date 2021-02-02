import React, { useState } from "react";
import { green } from "@material-ui/core/colors";
import {
  Button,
  Card,
  makeStyles,
  Paper,
  TextField,
  withStyles,
} from "@material-ui/core";
import styled from "styled-components";
import PageEssential from "../layout/PageEssential";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "relative",
    borderRadius: "16px",
    zIndex: 0,
    overflow: "hidden",
    boxShadow:
      "0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",
    marginTop: "10%",
  },
});

export const Wrapper = styled.div`
  padding: 25px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

export const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    boxShadow: "rgb(0 171 85 / 24%) 0px 8px 16px 0px",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    margin: "3px",
  },
}))(Button);

function AddUser() {
  const classes = useStyles();
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(
      "https://npoeootl24.execute-api.us-east-1.amazonaws.com/save",
      {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state,
        }), // body data type must match "Content-Type" header
      }
    );
    response = await response.json();
    console.log("response", response);
    if (response.user) alert("user saved in DB");
    else alert("user cannot be stored in DB");
  };
  return (
    <Paper className={classes.root}>
      <Card className={"card"}>
        <form onSubmit={onSubmitHandler}>
          <Wrapper>
            <TextField
              id="outlined-required"
              label="First Name"
              variant="outlined"
              style={{
                width: "100%",
                paddngTop: "20px",
                paddingBottom: "20px",
                color: "green",
              }}
              onChange={onChangeHandler}
              name="firstname"
            />
            <TextField
              id="outlined-required"
              label="Last Name"
              variant="outlined"
              style={{
                width: "100%",
                paddngTop: "20px",
                paddingBottom: "20px",
                color: "green",
              }}
              onChange={onChangeHandler}
              name="lastname"
            />
            <TextField
              id="outlined-required"
              label="Email"
              variant="outlined"
              style={{
                width: "100%",
                paddngTop: "20px",
                paddingBottom: "20px",
                color: "green",
              }}
              onChange={onChangeHandler}
              name="email"
            />
            <TextField
              id="outlined-required"
              label="Phone"
              variant="outlined"
              style={{
                width: "100%",
                paddngTop: "20px",
                paddingBottom: "20px",
                color: "green",
              }}
              onChange={onChangeHandler}
              name="phone"
            />
          </Wrapper>
          <ButtonWrapper>
            <ColorButton
              type="submit"
              variant="outlined"
              size="large"
              className={classes.margin}
            >
              Save
            </ColorButton>
          </ButtonWrapper>
        </form>
      </Card>
    </Paper>
  );
}
export default PageEssential(AddUser);
