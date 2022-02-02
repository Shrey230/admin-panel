import React from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'

import '../App.css'

class RegisterPage extends Component {
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
         
    handleSubmit = async (e) => {
      
        if (this.validate()) {
            console.log(this.state);
            try{
                const config={
                  headers: {
                    "Content-type" : "application/json"
                  }
                }
                const {data} = await axios.post(`http://localhost:4000/users/`,
                  {
    
                    email: this.state.input.email,
                    firstName: this.state.input.firstname,
                    lastName: this.state.input.lastname,
                    password:this.state.input.password,
                    
                    role:"Admin",
    
                  },
                  config
                    );  
                    alert(data.message)  
                } catch (e) {
                    alert(e.response.data.error)  
                }
            }
        else {
            alert("Something went wrong")
        }  
    }
  
      
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
       
        if (!input["firstname"]) {
            isValid = false;
            errors["firstname"] = "Please enter your firstname.";
        }
      
        if (typeof input["firstname"] !== "undefined") {
            const re = /^\S*$/;
            if (input["firstname"].length < 4 || !re.test(input["firstname"])) {
                isValid = false;
                errors["firstname"] = "Please enter valid firstname.";
            }
        }
        if (!input["lastname"]) {
            isValid = false;
            errors["lastname"] = "Please enter your lastname.";
        }
      
        if (input["lastname"] !== "lastname") {
            const re = /^\S*$/;
            if (input["lastname"].length < 4 || !re.test(input["lastname"])) {
                isValid = false;
                errors["lastname"] = "Please enter valid lastname.";
            }
        }
      
        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }
      
        if (typeof input["email"] !== "undefined") {
              
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
      
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }
      
        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                isValid = false;
                errors["password"] = "Please add at least 6 charachter.";
            }
        }
      
        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
              
            if (input["password"] !== input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }
      
        this.setState({
            errors: errors
        });
      
        return isValid;
    }
         
    render() {
        return (
            <div className= "text-center m-5-auto">
                <h1>Register for Admin Panel</h1>
                <form onSubmit={this.handleSubmit}>
      
                    <div className="form-group">
                        <label >Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.input.username}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter username"
                            id="username" />
      
                        <div className="text-danger">{this.state.errors.username}</div>
                    </div>
                    <div className="form-group">
                        <label >Lastname:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={this.state.input.lastname}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter lastname"
                            id="lastname" />
      
                        <div className="text-danger">{this.state.errors.username}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.input.email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email" />
      
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            id="password" />
      
                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.input.confirm_password}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter confirm password"
                            id="confirm_password" />
      
                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>
                    <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                    </p>
                 
                    <input type="submit" value="Submit" className="btn btn-success" />
                </form>
                <footer>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        );
    }
}
export  default (RegisterPage)

