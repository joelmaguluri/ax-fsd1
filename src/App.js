import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Users from "./components/clients/Users";
import AddUser from "./components/clients/addUsers";
import UserDetails from "./components/clients/UserDetails";
import Login from "./components/auth/login";


function App() {
  return (
    <Provider store={store}>
        <Router>
            <Switch>
              <Route
                exact
                path='/'
                component={Login}
              />

              <Route
                exact
                path='/dashboard'
                component={Users}
              />
              <Route
                exact
                path='/user/add'
                component={AddUser}
              />
              <Route
                exact
                path='/user/:id'
                component={UserDetails}/>
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
