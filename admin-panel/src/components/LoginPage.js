import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../App.css'

class SignInPage extends Component{
    
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
        };
         
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
            input
        });
    }
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }
      
        if ( input["email"] !== "undefined") {
              
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }
      
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                isValid = false;
                errors["password"] = "Please add at least 6 charachter.";
            }
        }
        this.setState({
            errors: errors
        });
      
        return isValid;


    }


    handleSubmit = async (e) => {
        
        if (this.validate()) {
          console.log(this.state);
          try {
            const data =
                {
                    email: this.state.input.email,
                    password: this.state.input.password,
                }
            console.log(data);
            axios.post('http://localhost:4000/users/login', data)
                .then(res => console.log(res.data));  
            this.setState({
                
                email: '',
                password: '', 
                
                })
           } catch (e) {
            alert(e.response.data.error)
          }
        }
      }

    render(){
        return (
            <div className="text-center m-5-auto">
                <h2>Sign in</h2>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Username or email address</label><br />
                        <input
                            type="text"
                            name="first_name"
                            value={this.state.input.email}
                            onChange={this.handleChange}
                            required />
                    </p>
                    <p>
                        <label>Password</label>
                        <Link to="/forget-password">
                            <label className="right-label">Forget password?</label></Link>
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            required />
                    </p>
                    <p>
                        <button id="sub_btn" >Login</button>
                        {this.state.email}
                        {this.state.password}
                    </p>
                </form>
                <footer>
                    <p>First time? <Link to="/register">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        )
    }

}
export  default (SignInPage)
