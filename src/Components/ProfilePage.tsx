import ConnectionHandler from "../Models/ConnectionHandler";
import {serverIp, serverPort} from "../App";
import "./ProfilePage.css"
import {useState} from "react";
import User from "../Models/User";
import {useNavigate} from "react-router-dom";

function ProfilePage() {

    let connHandler = new ConnectionHandler(serverIp, serverPort);

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [changedInput, setChangedInput] = useState(false);

    if(user === null) {

        connHandler.getUserByToken(sessionStorage['jwt'])
            .then(value => {

                if(value !== null) {
                    setUser(value)
                }
            });

        return (
            <div>
                Failed to load. Try re-authorize
        </div>
    )
    }

    return (
        <div>
            <div className="profile-title-container">
                <h1>{user.username}'s Profile</h1>
            </div>
            <div className="profile-main-container">
                <div className="profile-left-panel">
                    <p className="profile-key">Name</p>
                    <p id='p-name' className="profile-value">{user.name}</p>
                        <br/>
                    <p className="profile-key">Surname</p>
                    <p className="profile-value">{user.surname}</p>
                    <br/>
                    <p className="profile-key">Username</p>
                    <p className="profile-value">{user.username}</p>
                    <br/>
                    <p className="profile-key">Email</p>
                    <p className="profile-value">{user.email}</p>
                    <br/>
                </div>
                <div className="profile-right-panel">
                    <button onClick={handleChangeName} className="profile-button">Change name</button>
                    <br/>
                    <button className="profile-button">Change surname</button>
                    <br/>
                    <button className="profile-button">Change username</button>
                    <br/>
                    <button className="profile-button">Change email</button>
                    <br/>
                    <button className="profile-button">Change password</button>
                    <br/>
                </div>
            </div>
        </div>
);

    function submitInput(option:string, element:HTMLElement) {
        let input = (document.getElementById(`${option}-input`) as HTMLInputElement).value;

        connHandler.changeName(input, sessionStorage['jwt'])
            .then(response => {
                if(response.split('.').length === 3) {
                    sessionStorage['jwt'] = response;
                    setChangedInput(true);
                }
            });

        const inputElement = (document.getElementById('changing-input') as HTMLInputElement);
        const parentNode = inputElement.parentNode;
        if(parentNode !== null) {
            parentNode.replaceChild(element, inputElement)
        }
    }

    function handleChangeName() {
        let input = document.createElement('input');
        let p = (document.getElementById('p-name') as HTMLElement);

        input.id = 'name-input'
        input.className = 'changing-input';

        const parentNode = input.parentNode;
        if(parentNode !== null) {
            parentNode.replaceChild(p, input)
        }

        input.addEventListener('keydown', function(event) {
            if(event.keyCode === 13) {
                submitInput('name', p);
            }
        });
    }
}

export default ProfilePage;