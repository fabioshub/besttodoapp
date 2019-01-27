import React, { Component } from 'react';
import './login.css'
import { Redirect } from 'react-router-dom'

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
            redirect: false
        }
    }

    ChangeInput = (event) => {
        this.setState({[event.target.placeholder]: event.target.value})
    }

    Submit = (e) => {
        e.preventDefault()
        console.log(this.state)
        fetch("http://localhost:5000/login" , {
            host: 'localhost',
            port: 5000,
            path: '/login',
            method: 'POST',
            type: 'application/json',
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "username": this.state.Username,
                "password": this.state.Password,
            })
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
                if (res.login === true) {
                    localStorage.setItem('login', true)
                    localStorage.setItem('username', this.state.Username)
                    this.setState({redirect: true})
                } else {
                    console.log(res.message);
                }
            })
            .catch(e => console.log(e));
    }

    
    render() {

        if (this.state.redirect) {
            return (<Redirect to='/notes' />)
        } else {
        return(
            <div className="container" style={{display: "flex",  alignItems: "center", flexDirection: "column",  height: "100vh"}}>
                <form id="loginform" onSubmit={this.Submit} style={{display: "flex", flexDirection: "column", alignItem: "center"}}>
                <input type="username" placeholder="Username" style={{marginTop: "30vh"}} onChange={this.ChangeInput} required="true"></input>
                <input type="password" placeholder="Password" style={{margin: "0"}} onChange={this.ChangeInput} required="true"></input>
                <button type="submit"><i class="fas fa-user"></i></button>
                </form>
            </div>
        )
        }
    }
}

export default LoginScreen;