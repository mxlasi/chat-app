import React from 'react';
import firebase from '../firebase';
import {List, ListItem, ListItemText, Container, ThemeProvider} from '@material-ui/core';
import theme from '../theme';
import './Chatbox.css';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
    }

    componentDidMount() {
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats =  [];
            for(let chat in getChats) {
                if(getChats[chat].message !== ''){
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp
                    });
                }
            }
       const chats = ascChats;
       this.setState({chats});
        });
    }

    render() {
        return(
            <ThemeProvider theme = {theme}>
            <Container className="chatbox" class="container">
                <List className="chat-list">
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return(
                            <ListItem key={chat.id} divider="true" >
                                <em class="small">{postDate.getDate() + '/' + (postDate.getMonth()+1) + '   ' + (postDate.toLocaleTimeString())}</em>
                                <ListItemText className="user-name"><strong>{chat.user}: </strong>
                                {chat.message}</ListItemText>                          
                            </ListItem>
                        )
                    })}
                </List>

            </Container>
            </ThemeProvider>
        );
    }
}

export default Chatbox;