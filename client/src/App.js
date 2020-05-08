import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignUp from './Components/SignUp.js';
import SignIn from './Components/SignIn.js';
import ForgotPassword from './Components/ForgotPassword.js';
import Dashboard from './Components/Dashboard.js';
import Insert from './Components/Insert.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/forgotPassword" component={ForgotPassword} />>
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Insert" component={Insert} />
            <Route>
              <h1>Invalid request</h1>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
