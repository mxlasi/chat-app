import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import firebase, {auth } from './firebase.js';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Typography, Container, Toolbar, AppBar, Button} from '@material-ui/core';
import './index.css';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({user});
      }
    })
  }
  logOutUser = () => {
    firebase.auth().signOut()
    .then(window.location = "/");
  }

  render() {
    return (
<Router>
  <Typography>
    <Container className = "app">
  
      <Toolbar>
  {!this.state.user &&
        <AppBar> 
          <Container className ="links">
        <Link to="/login"><Button>Login</Button></Link>
        <Link to="/register"><Button>Register</Button></Link>
        <Link to="/"><Button>Main</Button></Link>
        </Container>
        </AppBar>
  }
  {this.state.user &&
         <AppBar> 
         <Container className ="links">
       <Link href="#!" onClick={this.logOutUser}><Button>Log out</Button></Link>
       </Container>
       </AppBar>
  }    
        </Toolbar>
      <Switch>
        <Route path="/" exact render={() => <App user={this.state.user}/>} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
  </Container>
  </Typography>
</Router>

    );
  }
}

ReactDOM.render(
  <ThemeProvider theme = {theme}>
 <AppRouter />
 </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
