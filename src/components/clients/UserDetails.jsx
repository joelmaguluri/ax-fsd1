import React, { useState } from "react";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";
import PageEssential from "../layout/PageEssential";
import { Wrapper, ButtonWrapper, ColorButton } from "./addUsers";

const useStyles = makeStyles({
  root: {
    marginTop: "5%",
    marginLeft: "10px",
  },
  paper: {
    width: "100%",
    card: {
      zIndex: "0",
      overflow: "hidden",
      position: "relative",
      boxShadow:
        "0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",
      borderRadius: "16px",
    },
  },
  orange: {
    color: "White",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    fontSize: "30px",
  },
});

const StyledFlex = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .wrapper {
    width: 144px;
    border: 1px dashed rgba(145, 158, 171, 0.32);
    height: 144px;
    margin: auto;
    padding: 8px;
    border-radius: 50%;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  outline: none;
  z-index: 0;
  overflow: hidden;
  position: relative;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
`;
function UserDetails() {
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
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Card className={"card"}>
            <StyledFlex>
              <div className="wrapper">
                <ImageWrapper>
                  <Avatar alt="Remy Sharp" className={classes.orange}>
                    B
                  </Avatar>
                </ImageWrapper>
              </div>
              <h6 style={{ marginTop: "3px", alignSelf: "center" }}>Sudeep</h6>
              <Divider variant="middle" color="grey" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h6 style={{ marginRight: "10px" }}>msudeep.joel@gmail.com</h6>
                <h6>9705825766</h6>
              </div>
            </StyledFlex>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
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
                  Update
                </ColorButton>
              </ButtonWrapper>
            </form>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PageEssential(UserDetails);
