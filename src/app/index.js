import React from 'react'
import {ReactDom, render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Main from './Main'

const flexContainer = {
    display: "flex"
};

const app = document.getElementById('app');
render(
    <MuiThemeProvider>
            <Router>
                <Main />
            </Router>
    </MuiThemeProvider>
    , app
)