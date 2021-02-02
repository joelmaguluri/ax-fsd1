import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppNavBar from "./AppNavBar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const MenuItem = ({ name, active }) => {
  return (
    <div>
      <a
        href={name === "Dashboard" ? "/dashboard" : "/user/add"}
        style={{
          display: "flex",
          height: "60px",
          flexDirection: "row",
          color: active ? " #00AB55" : "#637381",
          backgroundColor: active ? "rgba(0, 171, 85, 0.08)" : "none",
          borderRight: active ? "2px solid #00AB55" : "none",
          margin: 0,
          fontWeight: active ? "600" : "500",
          fontFamily: "Alegreya Sans, sans-serif",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          borderRadius: "2px",
          fontSize: "15pt",
        }}
      >
        <span>
          {name === "Dashboard" ? (
            <i className="fa fa-tachometer" />
          ) : (
            <i className="fa fa-user" />
          )}
        </span>
        <span style={{ marginLeft: "10px" }}> {name}</span>
      </a>
    </div>
  );
};

const StyledPaper = styled(Paper)`
  text-align: center;
  color: white;
  height: 100vh;
  border-right: 1px solid rgba(145, 158, 171, 0.24);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  padding: 24px 20px;
  a {
    font-family: "Alegreya Sans", sans-serif;
    font-weight: 700;
    font-size: 18pt;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
    background: none;
  }
`;

const ClientHOC = (Component) => {
  const HOC = ({ match }) => {
    const user = useSelector((state) => state.authentication.user);
    const path = match.path;
    const isDashboard = path.includes("dashboard");
    if (user)
      return (
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <StyledPaper elevation={0}>
              <Logo>
                <a href="/" className="logo-wrapper">
                  <h3 style={{ color: "#919eab" }}>
                    Contact <span style={{ color: "#00AB55" }}>Manager</span>
                  </h3>
                </a>
              </Logo>
              <MenuItem name="Dashboard" active={isDashboard} />
              <MenuItem name="Create User" active={!isDashboard} />
            </StyledPaper>
          </Grid>
          <Grid item xs={9}>
            <Component />
          </Grid>

          <Grid item xs={1}>
            <AppNavBar />
          </Grid>
        </Grid>
      );
    else return <Redirect to="/" />;
  };
  return HOC;
};

export default ClientHOC;
