import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper'
import React, {Component} from 'react'
import {Route, Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import styles from './styles.js'
import ErrorBanner from './errorBanner.js'
import Loading from './Loading.js'

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "jason.tenbrink@gmail.com",
      password: "JasJen23",
      authenticationError: false,
      isSubmitting: false
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleFieldChange(inputName, e){
    this.setState({[inputName]: e.target.value})
  }

  submit({ username, password }) {
    this.setState({ authenticationError: false })
    this.setState({ isSubmitting: true })
    let data = { username, password }
    axios.post('/login', data)
      .then(response => {
        this.setState({ isSubmitting: false })
        window.location.assign('/')
      })
      .catch(response => {
        this.setState({ authenticationError: true })
        this.setState({ isSubmitting: false })
      })
  }

  render(){
    return (
      <div>
        <Loading show={this.state.isSubmitting} />
        <div style={styles.container}>
          <Paper id="formContainer" style={styles.formContainer} zDepth={1}>
            <div style={styles.welcomeContainer}>
              <h1 style={styles.welcome}>Teensy Weensy Login</h1>
            </div>
            <ErrorBanner showError={this.state.authenticationError}/>
            <form style={styles.mainBox} action="/" method="post">
              <input style={styles.input}
                placeholder = "user name"
                type="text"
                name="username" 
                value={this.state.username} 
                onChange={e => this.handleFieldChange("username",e)}
                autoFocus />
          
              <input style={styles.input}
                type="password"
                name="password" 
                placeholder = "password"
                value={this.state.password}
                onChange={e => this.handleFieldChange("password",e)}
              />

              <RaisedButton 
                onClick={() => this.submit(this.state)}
                disabled = {this.state.isSubmitting}
                id="submit11"
                style={styles.submitButton}
                labelStyle={styles.submitLabel}
                buttonStyle={styles.submitButton}
                label="Log In"
              />
          </form>
          <p style={{textAlign: "center"}}>--or--</p>
          <Link to="/register">Register for a new account</Link>
          </Paper>
        </div>
        
        {/* {(()=>{
          setTimeout(()=>{
            document.getElementById('submit11').click();
          }, 0)
        })()} */}
      </div>
    )
  }
  
}


