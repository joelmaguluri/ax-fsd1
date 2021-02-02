import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppNavBar from "./AppNavBar";
import styled from "styled-components";

const MenuItem = ({ name }) => {
  return (
    <a href="/client/add">
      <ul
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "row",
          height: "48px",
          justifyItems: "center",
          justifyContent: "center",
          color: " #00AB55",
          fontWeight: "600",
          backgroundColor: "rgba(0, 171, 85, 0.08)",
          listStyleType: "none",
          borderRight: "#00AB55",
          margin: 0,
        }}
      >
        <li style={{ marginRight: "16px", alignSelf: "center" }}>
          <i className="fa fa-tachometer" />
        </li>
        <li style={{ alignSelf: "center" }}> {name}</li>
      </ul>
    </a>
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
  a:hover {
    text-decoration: none;
    background: none;
  }
`;

const PageEssential = (Component) => {
  class HOC extends React.Component {
    render() {
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
              <MenuItem name="Dashboard" />
              <MenuItem name="Create User" />
            </StyledPaper>
          </Grid>
          <Grid item xs={8}>
            <AppNavBar />
            <Component />
          </Grid>
        </Grid>
      );
    }
  }
  return HOC;
};

export default PageEssential;
