import React, { Component } from 'react'
import '../Css/Login.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import { withRouter } from "react-router";
import UserService from '../services/userService';
import Snackbar from '@material-ui/core/Snackbar';
const service = new UserService()


class Login extends Component {
    constructor(probs){
        super(probs);
        this.state ={
            "username":"",
            "password":"",
            "usernameError":false,
            "usernameMsg":"",
            "passwordError":false,
            "passwordErrorMsg":"",
            "showpassword":true,
            "show": false,
            "snackmsg":""

        } 
    }

    handlechange =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }

    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })
 
    }

    validateField = () => {
        this.setState({
            usernameError: false,
            usernameErrorMsg: '',
            passwordError: false,
            passwordErrorMsg: '',
        })
        var valid = true;
 
        let userPattern = new RegExp('^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$');
        if (!userPattern.test(this.state.username)) {
            this.setState({ usernameError: true })
            this.setState({ usernameErrorMsg: "Invalid Gmail address" })
            valid = false;
        }
 
        if (this.state.username.length === 0) {
            this.setState({ usernameError: true })
            this.setState({ usernameErrorMsg: "Enter Gmail address" })
            valid = false;
        }
 
        let pwdPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z])(?=.*[#?!@$%^&*-]).{8,}$');
        if (!pwdPattern.test(this.state.password)) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "Invalid Password" })
            valid = false;
        }
 
        if (this.state.password.length < 8) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "Password should be atleast 8 characters" })
            valid = false;
        }
 
        if (this.state.password.length === 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "Enter a password" })
            valid = false;
        }
 
        return valid;
 
    }

    submit = () => {
        if(this.validateField()){
            this.setState({show:true})
            let userData = {
                "email":this.state.username,
                "password":this.state.password,
                "server":"advance"
            }
            console.log(userData);
            service.login(userData).then((result) => { 
                this.setState({show:true})
                this.setState({snackmsg:"Login Successfull"})
                console.log("logged in successfull");
                console.log(result);
                var token = result.data.id;
                console.log(token);
                localStorage.setItem('Token',token);
                localStorage.setItem('FirstName',result.data.firstName);
                localStorage.setItem('LastName',result.data.lastName);
                localStorage.setItem('Email',result.data.email);
                this.props.history.push('./Dashboard/Notes')
            }).catch((error) => {
                console.log(error);
                this.setState({ snackmsg: "Incorrect credentials" })
                this.setState({show: true})
            })   
        }
        else{
            this.setState({ show: true })
            this.setState({ snackmsg: "Please Enter Valid details" })
        }
    }

    render() {
        return (
            <div>
                <div className="fullbody">
                    <div className="loginbody">
                        <div className="topcontent">
                            <div className="fitWidth">
                                <span style={{ color: '#4385F4', fontSize: '25px', fontWeight: 500 }}>G</span>
                                <span style={{ color: '#EA4335', fontSize: '25px', fontWeight: 500 }}>o</span>
                                <span style={{ color: '#FBBD35', fontSize: '25px', fontWeight: 500 }}>o</span>
                                <span style={{ color: '#4385F4', fontSize: '25px', fontWeight: 500 }}>g</span>
                                <span style={{ color: '#4EA853', fontSize: '25px', fontWeight: 500 }}>l</span>
                                <span style={{ color: '#EA4335', fontSize: '25px', fontWeight: 500 }}>e</span>
                            </div>
                            <p className="fonty" > Sign in</p>
                            <div >  Use your Google Account </div>
                            <div className="textfields">
                                <TextField id="outlined-basic" error={this.state.usernameError} helperText={this.state.usernameErrorMsg} onChange={this.handlechange} className="TFwidth" variant="outlined" name="username" label="Email or phone " size="small" margin="dense" />

                                <TextField id="outlined-basic" type={this.state.showpassword ? "password" : "type"}  error={this.state.passwordError} helperText={this.state.passwordErrorMsg} variant="outlined" className="TFwidth" name="password" label="Password" size="small" margin="dense" onChange={this.handlechange} />
                                <div className="pas">
                                    <input type="checkbox" id="radio" onClick={this.handleClick}  value="Show password"/>
                                    <label htmlFor="radio"> Show password</label>
                                </div>
                            </div>

                        </div>
                        <div className="notComp">Not your computer? Use Guest mode to sign in privately.<br></br><a className="link" href="https://support.google.com/chrome/answer/6130773?hl=en-GB" >Learn more</a></div>
                            <div className="forget">Forget password?</div>
                            <div className="createaccount" onClick={()=>this.props.history.push('./Signup')}>Create Account</div>
                            <div className="inline__button">
                            <Button variant="outlined" size="small" onClick={this.submit}>Login</Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                open={this.state.show}
                                autoHideDuration={1000}
                                onClose={this.handleClose}
                                message={this.state.snackmsg}
                            />
                            
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter (Login);