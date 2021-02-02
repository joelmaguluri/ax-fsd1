import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "none",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 18pt;
`;

export default function AppNavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <StyledButton
        variant="outlined"
        onClick={() => {
          dispatch({
            type: LOGOUT,
          });
        }}
      >
        Logout
      </StyledButton>
    </div>
  );
}
