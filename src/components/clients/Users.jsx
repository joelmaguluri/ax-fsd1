import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import ClientHOC from "../layout/ClientHOC";
import { useDispatch, useSelector } from "react-redux";
import { SERVER, SET_USERS } from "../../constants";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

const StyledButton = styled(Button)`
  font-weight: 300;
  font-size: 15pt;
  a {
    text-decoration: none;
    color: #55595e;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  p {
    font-weight: 700;
    font-family: "Alegreya Sans";
    font-size: 18pt;
  }
`;

const StyledTabCell = styled(TableCell)`
  font-family: "Alegreya Sans";
  font-size: 17pt;
  font-weight: 500;
  color: #55595e;
`;

const useStyles = makeStyles({
  root: {
    fontFamily: "Alegreya Sans, sans-serif",
    width: "100%",
    position: "relative",
    borderRadius: "16px",
    zIndex: 0,
    overflow: "hidden",
    boxShadow:
      "0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",
    marginTop: "10%",
    card: {
      display: "flex",
      padding: "24px",
      paddingBottom: "0",
      border: "0",
      zIndex: "0",
      overflow: "hidden",
      position: "relative",
      boxShadow:
        "0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",
      borderRadius: "16px",
      alignContent: "center",
    },
    container: {
      maxHeight: 440,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  },
});

let TableHeaderCell = withStyles((theme) => ({
  root: {
    fontFamily: "Alegreya Sans, sans-serif",
    fontWeight: "600",
    fontSize: "15pt",
    textAlign: "left",
    backgroundColor: (props) => (props.background ? "#F4F6F8" : null),
    padding: "16px",
    paddingLeft: (props) => (props.first ? "24px" : null),
    paddingRight: (props) => (props.last ? "24px" : null),
    boxShadow: (props) => {
      if (props.first) return "inset 8px 0 0 #fff";
      else if (props.last) return "inset -8px 0 0 #fff";
      return null;
    },
    borderTopLeftRadius: (props) => (props.first ? "8px" : null),
    borderBottomLeftRadius: (props) => (props.first ? "8px" : null),
    borderTopRightRadius: (props) => (props.last ? "8px" : null),
    borderBottomRightRadius: (props) => (props.last ? "8px" : null),
    color: "#637381",
    marginLeft: "2px",
    border: "none",
    borderSpacing: "0",
  },
}))(TableCell);

let Content = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}))(CardContent);

function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const rows = useSelector((state) => state.users.users);
  const [state, setUsers] = useState({ users: [], filteredusers: [] });

  //fetching details and updating store
  useEffect(() => {
    const fetchUsers = async () => {
      let result = await fetch(`${SERVER}/users`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      await dispatch({
        type: SET_USERS,
        payload: {
          users: response.users,
        },
      });
      setLoading(false);
    };
    fetchUsers();
  }, [dispatch]);

  useMemo(() => {
    setUsers({ users: rows, filteredusers: rows });
  }, [rows]);

  const searchtaskbyname = (e) => {
    /*filters the users based on the search*/
    let usersname = e.target.value;

    //compare the tasks which matches input task and display them
    let searchresult = state.users.filter((user) =>
      `${user["firstname"]}${user["lastname"]}`
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(usersname.toLowerCase())
    );
    setUsers({ ...state, filteredusers: searchresult });
  };

  //if state is loading return loading else return table
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <Paper className={classes.root}>
          <Card className={classes.card} elevation={0}>
            <Content>
              <Flex>
                <Typography color="textSecondary">Users</Typography>

                <TextField
                  aria-invalid="false"
                  type="password"
                  variant="outlined"
                  placeholder="Search"
                  onChange={searchtaskbyname}
                />
              </Flex>
            </Content>
          </Card>
          <TableContainer className={classes.container}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableHeaderCell first background>
                    Id
                  </TableHeaderCell>
                  <TableHeaderCell background>FirstName</TableHeaderCell>
                  <TableHeaderCell background>LastName</TableHeaderCell>
                  <TableHeaderCell background>Email</TableHeaderCell>
                  <TableHeaderCell background>Phone</TableHeaderCell>
                  <TableHeaderCell last background></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.filteredusers.map((row) => (
                  <TableRow key={row._id}>
                    <StyledTabCell>{row._id}</StyledTabCell>
                    <StyledTabCell>{row.firstname}</StyledTabCell>
                    <StyledTabCell>{row.lastname}</StyledTabCell>
                    <StyledTabCell>{row.email}</StyledTabCell>
                    <StyledTabCell>{row.phone}</StyledTabCell>
                    <StyledTabCell>
                      <StyledButton variant="outlined">
                        <Link to={`/user/${row._id}`}>Details</Link>
                      </StyledButton>
                    </StyledTabCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}

export default ClientHOC(Users);
