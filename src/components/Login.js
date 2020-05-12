import React from 'react';
import firebase from '../firebase.js';
import {Button, Typography, Input, InputLabel, Container, ThemeProvider} from '@material-ui/core';
import { Link } from 'react-router-dom';
import theme from '../theme';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
         }
     }
     handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
  }
  render(){
      
    const {email, password, error} = this.state;
    return(
        <ThemeProvider theme ={theme}>
        <Container class="container">
            
           <Typography variant="h2">Login</Typography>
    <Typography>{error && <p className="error-message">{error.message}</p>}
    <form onSubmit={this.handleSubmit}>
        <InputLabel htmlFor="email" shrink>Email address</InputLabel>
        <Input type="text" name="email" id="email" value={email} onChange={this.handleChange}></Input><br></br>
        <InputLabel htmlFor="password" shrink>Password</InputLabel>
        <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChange}
            ></Input><br></br>
            <Button type="submit" color="secondary">Login</Button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
         </form>
         
         </Typography></Container></ThemeProvider>

    
        );
    }
}
export default Login;