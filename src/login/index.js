import React from 'react'
import {ReactDom, render} from 'react-dom'
import axios from 'axios'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import LoginForm from './LoginForm.js'
import Register from './Register'
injectTapEventPlugin();

const app = document.getElementById('app');

render(
  <MuiThemeProvider>
    <Router>
      <div>
        <Route exact={true} path="/" component={LoginForm} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  </MuiThemeProvider>, app
);