import React from "react";
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
import PageEssential from "../layout/PageEssential";
import { useSelector } from "react-redux";

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
    fontWeight: "600",
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
  let rows = useSelector((state) => state.users);
  console.log(rows);
  // const [page] = React.useState(0);
  // const [rowsPerPage] = React.useState(10);

  return (
    <Paper className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <Content>
          <div style={{ width: "50%" }}>
            <Typography className={classes.title} color="textSecondary">
              Users
            </Typography>
          </div>
          <div
            className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl"
            style={{ width: "50%" }}
          >
            <input
              aria-invalid="false"
              type="password"
              className="MuiInputBase-input MuiOutlinedInput-input"
              style={{ padding: "25px 12px 8px", float: "right" }}
              defaultValue
            />
          </div>
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
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableHeaderCell component="th" scope="row" first>
                  {row.id}
                </TableHeaderCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell last>{row.lastname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Link
                    to={`/client/${row._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    {/* <FontAwesomeIcon icon={faArrowCircleRight} /> */}
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PageEssential(Users);
