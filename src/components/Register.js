import React from 'react';
import firebase from '../firebase.js';
import { Button, Typography, Container, Input, InputLabel, ThemeProvider} from '@material-ui/core';
import { Link } from 'react-router-dom';
import theme from '../theme';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
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
        const {email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
    })
    .catch(error => {
        this.setState({error});
    })
}
    render(){
        const {email, username, password, error} = this.state;
        return(
            <ThemeProvider theme = {theme}>
            <Typography>
            <Container className="auth-container" class="container">
                <Typography variant="h2">Register</Typography>
        {error && <p className="error-message">{error.message}</p>}
        <form onSubmit={this.handleSubmit}>
            <InputLabel htmlFor="username" shrink>Username</InputLabel>
            <Input type="text" name="username" id="username" value={username} onChange={this.handleChange}></Input>
            <InputLabel htmlFor="email" shrink>Email address</InputLabel>
            <Input type="text" name="email" id="email" value={email} onChange={this.handleChange}></Input>
            <InputLabel htmlFor="password" shrink>Choose a password</InputLabel>
            <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                ></Input><br></br>
                <Button color="secondary" type="submit">Get started</Button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
                </form>


        </Container>
        </Typography>
        </ThemeProvider>
        );
    }
}
export default Register;