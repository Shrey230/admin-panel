import React from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'

import '../App.css'

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},

        };

        this.validate = this.validate.bind(this);
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
      const {email,firstName,lastName,password} = this.state.input
        if (this.validate()) {
            try{
                const config={
                  headers: {
                    "Content-type" : "application/json"
                  }
                }
                const {data} = await axios.post(`http://localhost:4000/users/`,
                  {
                    email,
                    firstName,
                    lastName,
                    password,
                    role:"Admin",
    
                  },
                  config); 
                  alert(data) 

                } catch (e) {
                    alert(e.response.data.error)  
                }
            }
        else {
            alert(this.state.errors)
        }  
    }   
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true

        if (!input["firstName"]) {
            isValid = false
            errors["firstName"] = "Please enter your firstName.";
        }

        if (typeof input["firstName"] !== "undefined") {
            const re = /^\S*$/;
            if (input["firstName"].length < 4 || !re.test(input["firstName"])) {
                this.setState({ isValid: false })
                errors["firstName"] = "Please enter valid firstName.";
            }
        }
        if (!input["lastName"]) {
            this.setState({ isValid: false })
            errors["lastName"] = "Please enter your lastName.";
        }

        if (input["lastName"] !== "lastName") {
            const re = /^\S*$/;
            if (input["lastName"].length < 4 || !re.test(input["lastName"])) {
                this.setState({ isValid: false })
                errors["lastName"] = "Please enter valid lastName.";
            }
        }

        if (!input["email"]) {
            this.setState({ isValid: false })
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                this.setState({ isValid: false })
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["password"]) {
            isValid = false
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                isValid = false
                errors["password"] = "Please add at least 6 charachter.";
            }
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] !== input["confirm_password"]) {
                isValid = false
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });
        return true;
    } 
    render() {
        return (
            <div className= "text-center m-5-auto">
                <h1>Register for Admin Panel</h1>
                <form >
                    <div className="form-group">
                        <label >Firstname:</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter first name"
                            id="firstName" required/>
      
                        <div className="text-danger">{this.state.errors.firstName}</div>
                    </div>
                    <div className="form-group">
                        <label >lastName:</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter lastName"
                            id="lastName" required/>
      
                        <div className="text-danger">{this.state.errors.lastName}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email" required/>
      
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            id="password" required/>
      
                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter confirm password"
                            id="confirm_password" required />
      
                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>
                    <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                    </p>
                 
                    <button id='sub_btn' onClick={this.handleSubmit}>Submit</button>
                    {/* <input type="submit" value="Submit"  /> */}
                </form>
                <footer>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        );
    }
}
export default RegisterPage



