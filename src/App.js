import React from 'react';
import Chatbox from './components/Chatbox';
import firebase from './firebase';
import {Button, Typography, ThemeProvider, Input, Container} from '@material-ui/core';
import theme from './theme';
import { Link } from 'react-router-dom';


class App extends React.Component {
constructor(props) {
   super(props);
  this.state = {
    message: '',
     };
  }

onChange = (event) => {
  this.setState({[event.target.name]: event.target.value });
}

onSubmit = (event) => {
  event.preventDefault();
  if(this.state.message !== ''){
    const chatRef = firebase.database().ref('general');
    const chat = {
      message: this.state.message,
      user: this.props.user.displayName,
      timestamp: new Date().getTime()
    }

    chatRef.push(chat);
    this.setState({message: ''});

  }
}

render() {
 
  return (
    <ThemeProvider theme={theme}>
    <Container className="App" class="container">
      <Typography variant="h2">Chat App</Typography><Typography>

      {this.props.user &&
      <Container className="allow-chat">
      <Chatbox />
      
      <form className="message-form" onSubmit={this.onSubmit}>
      <Input
      fullWidth="true" 
      type="text"
      name="message"
      id="message"
      value={this.state.message}
      placeholder="Enter a message..."
      onChange={this.onChange} />
<Button color="secondary" type="submit">Send</Button>
      </form>
    </Container>
}

{!this.props.user &&
<div className="disallow-chat">
  <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</p>
  </div>
  }
  </Typography>
</Container>
</ThemeProvider>
        ); 
    }   
}
export default App;
