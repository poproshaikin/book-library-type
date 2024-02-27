import "./SignUp.css"
import ConnectionHandler from "../Models/ConnectionHandler";
import User from "../Models/User";
import {serverIp, serverPort} from "../App";
import {useNavigate} from "react-router-dom";

function SignUp({reloadTopBar}:{reloadTopBar: () => void}) {

    let connHandler = new ConnectionHandler(serverIp, serverPort);
    const navigate = useNavigate();

    function handleSignUp() {
        const name = (document.getElementById('name-input') as HTMLInputElement).value;
        const surname = (document.getElementById('surname-input') as HTMLInputElement).value;
        const username = (document.getElementById('username-input') as HTMLInputElement).value;
        const email = (document.getElementById('email-input') as HTMLInputElement).value;
        const password = (document.getElementById('password-input') as HTMLInputElement).value;

        if (
            name === null ||
            surname === null ||
            username === null ||
            email === null ||
            password === null
        ) {
            return;
        }

        if(
            name === "" ||
            surname === "" ||
            username === "" ||
            email === "" ||
            password === ""
        ) {
            (document.getElementById('inform-p') as HTMLElement).textContent = "Input cannot be empty";
            return;
        }

        let hashedPassword = ConnectionHandler.sha256(password);

        let user = new User();

        user.name = name;
        user.surname = surname;
        user.username = username;
        user.email = email;
        user.password = hashedPassword;

        connHandler.signupUser(user)
            .then(jwt => {
                if(jwt.split('.').length === 3) {
                    sessionStorage['jwt'] = jwt;
                    (document.getElementById('inform-p') as HTMLElement).textContent = "Success";
                    reloadTopBar();
                    navigate('/');
                } else if(jwt === "Exists username") {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "This username is claimed";
                } else if(jwt === "Exists email") {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "This email is claimed";
                }
            });
    }

    function onChange() {
        (document.getElementById('inform-p') as HTMLElement).textContent = "⠀";
    }

    return (
        <div>
            <div className="title-container">
                <h1>Register up</h1>
            </div>
            <div className="page-container">
                <div className="form-container">
                    <input id='name-input' onChange={onChange} type="text" className="input" placeholder="Name"/>
                    <input id='surname-input' onChange={onChange} type="text" className="input" placeholder="Surname"/>
                    <input id='username-input' onChange={onChange} type="text" className="input" placeholder="Username"/>
                    <input id='email-input' onChange={onChange} type="email" className="input" placeholder="Email"/>
                    <input id='password-input' onChange={onChange} type="text" className="input" placeholder="Password"/>
                    <br/>
                    <p id='inform-p' className='p'>⠀</p>
                    <button className="confirm-button" onClick={handleSignUp}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;