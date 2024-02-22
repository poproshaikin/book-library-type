import "./Login.css"
import "./SignUp.css"
import {useState} from "react";
import LoginDTO from "../Models/DTO/LoginDTO";
import ConnectionHandler from "../Models/ConnectionHandler";
import {serverIp, serverPort} from "../App";

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    let connHandler = new ConnectionHandler(serverIp, serverPort);

    function handleShowPass() {
        if(!showPassword) {
            (document.getElementById("password-input") as HTMLInputElement).type = "text";
            setShowPassword(!showPassword);
        } else {
            (document.getElementById("password-input") as HTMLInputElement).type = "password";
            setShowPassword(!showPassword);
        }
    }

    function handleLogin() {
        const username = (document.getElementById('username-input') as HTMLInputElement).value;
        const email = (document.getElementById('email-input') as HTMLInputElement).value;
        const password = (document.getElementById('password-input') as HTMLInputElement).value;

        if((username === '' && email === '') || password === '') {
            (document.getElementById('inform-p') as HTMLElement).textContent = "Input cannot be empty";
            return;
        }

        let loginDto = new LoginDTO (
            ConnectionHandler.sha256(password),
            username === '' ? undefined : username,
            email === '' ? undefined : email
        );

        connHandler.loginUser(loginDto)
            .then(response => {
                if(response.split('.').length === 3) {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "Success";
                    sessionStorage['jwt'] = response;
                } else if(response === 'Not found') {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "User not found";
                } else if(response === 'Unauthorized') {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "Incorrect password";
                }
            })
    }

    function onChange() {
        (document.getElementById('inform-p') as HTMLElement).textContent = "⠀";
    }

    return (
        <div>
            <div className="title-container">
                <h1>Login</h1>
            </div>
            <div className="page-container">
                <div className="form-container">
                    <input id='username-input' onChange={onChange} className="input" type="text" placeholder="Username"/>
                    <br/>
                    <p className="p"> Or </p>
                    <br/>
                    <input id='email-input' onChange={onChange} className="input" type="email" placeholder="Email"/>
                    <br/>
                    <hr/>
                    <br/>
                    <div className="input-with-button">
                        <input id='password-input' onChange={onChange} className="input" type="password" placeholder="Password"/>
                        <input id='show-password' onClick={handleShowPass} className="show-password-checkbox"
                               type="checkbox"/>
                    </div>
                    <br/>
                    <p id='inform-p' className='p'>⠀</p>
                    <button className="confirm-button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;