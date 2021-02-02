import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    left: "auto",
    width: "100%",
    zIndex: 100,
  },
  appbar: {
    boxShadow: "none",
    backdropFilter: "blur(8px)",
    backgroundColor: " rgba(255, 255, 255, 0.72)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
}));

export default function AppNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { compose } from "redux";
// import { connect } from "react-redux";
// import { firebaseConnect } from "react-redux-firebase";

// class AppNavBar extends Component {
//   state = {
//     isAuthenticated: false,
//   };

//   static getDerivedStateFromProps(props, state) {
//     const { auth } = props;
//     if (auth.uid) {
//       return { isAuthenticated: true };
//     } else {
//       return { isAuthenticated: false };
//     }
//   }

//   logOutHandler = (e) => {
//     e.preventDefault();
//     const { firebase } = this.props;
//     firebase.logout();
//   };

//   render() {
//     const { isAuthenticated } = this.state;
//     const { auth } = this.props;
//     return (
//       <nav className='navbar navbar-expand-md navbar-dark bg-primary mb-4'>
//         <div className='container'>
//           <Link to='/' className='navbar-brand'>
//             Salve Client Panel
//           </Link>
//           <button
//             className='navbar-toggler'
//             type='button'
//             data-toggle='collapse'
//             data-target='#navbarMain'
//           >
//             <span className='navbar-toggler-icon'></span>
//           </button>
//           <div className='collapse navbar-collapse' id='navbarMain'>
//             <ul className='navbar-nav mr-auto'>
//               {isAuthenticated ? (
//                 <li className='nav-item'>
//                   <Link to='/' className='nav-link'>
//                     Dashboard
//                   </Link>
//                 </li>
//               ) : null}
//             </ul>
//             {isAuthenticated ? (
//               <ul className='navbar-nav ml-auto'>
//                 <li className='nav-item'>
//                   <a href='#!' className='nav-link'>
//                     {auth.email}
//                   </a>
//                 </li>
//                 <li className='nav-item'>
//                   <a
//                     href='#!'
//                     className='nav-link'
//                     onClick={this.logOutHandler.bind(this.props)}
//                   >
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             ) : null}
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default compose(
//   firebaseConnect(),
//   connect((state, props) => ({
//     auth: state.firebase.auth,
//   }))
// )(AppNavBar);
