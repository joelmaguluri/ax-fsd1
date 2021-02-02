import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClientHOC from "../layout/ClientHOC";
import { Wrapper, ButtonWrapper, ColorButton } from "./addUsers";
import { withRouter } from "react-router-dom";
import { Input } from "../auth/login";
import { Avatar, Card, Grid, makeStyles, Paper } from "@material-ui/core";
import { SERVER } from "../../constants";

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

const Text = styled.h6`
  color: #55595e;
  font-family: "Alegreya Sans";
  font-size: ${(props) => (props.name ? "18pt" : "14pt")};
  i {
    padding-right: 3px;
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

function UserDetails(props) {
  const { match, history } = props;
  const id = match.params.id;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  //fetching user
  useEffect(() => {
    const fetchUsers = async () => {
      let response = await fetch(SERVER + "/id/" + id, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      let user = response.user._doc;
      setState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
      });
      setLoading(false);
    };
    fetchUsers();
  }, [id]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //make updates to user
  const UpdateHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(`${SERVER}/id/${id}`, {
      method: "PUT",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
      }), // body data type must match "Content-Type" header
    });
    response = await response.json();
    console.log(response);
    if (response.err) alert("save failed");
    else alert("successfully updated");
  };

  //delete user
  const deleteUser = async (id) => {
    let response = await fetch(`${SERVER}/id/${id}`, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.message) history.push("/dashboard");
    else alert("successfully updated");
  };

  if (loading) return <></>;
  const { firstname, lastname, email, phone } = state;
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Card className={"card"}>
            <StyledFlex>
              <div className="wrapper">
                <ImageWrapper>
                  <Avatar alt="Remy Sharp" className={classes.orange}>
                    {state.firstname.charAt(0).toUpperCase() +
                      " " +
                      state.lastname.charAt(0).toUpperCase()}
                  </Avatar>
                </ImageWrapper>
              </div>
              <Text
                style={{ marginTop: "3px", alignSelf: "center" }}
                name={true}
              >
                {state.firstname + " " + state.lastname}
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text style={{ marginRight: "10px" }}>
                  <i className="fa fa-envelope"></i>
                  {state.email}
                </Text>
                <Text>
                  <i className="fa fa-phone"></i>
                  {state.email}
                </Text>
              </div>
            </StyledFlex>
            <ButtonWrapper>
              <ColorButton
                type="submit"
                variant="outlined"
                size="large"
                className={classes.margin}
                color="red"
                onClick={() => deleteUser(id)}
              >
                Delete
              </ColorButton>
            </ButtonWrapper>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Card className={"card"}>
            <form onSubmit={UpdateHandler}>
              <Wrapper>
                <Input
                  id="outlined-required"
                  label="First Name"
                  variant="outlined"
                  onChange={onChangeHandler}
                  name="firstname"
                  defaultValue={firstname}
                />
                <Input
                  id="outlined-required"
                  label="Last Name"
                  variant="outlined"
                  onChange={onChangeHandler}
                  name="lastname"
                  defaultValue={lastname}
                />
                <Input
                  id="outlined-required"
                  label="Email"
                  variant="outlined"
                  onChange={onChangeHandler}
                  name="email"
                  defaultValue={email}
                />
                <Input
                  id="outlined-required"
                  label="Phone"
                  variant="outlined"
                  onChange={onChangeHandler}
                  name="phone"
                  defaultValue={phone}
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

export default ClientHOC(withRouter(UserDetails));
