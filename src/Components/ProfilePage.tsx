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
                    <div className="rp-button-container">
                        <button className="profile-button">Change name</button>
                    </div>
                    <div className="rp-button-container">
                        <button className="profile-button">Change surname</button>
                    </div>
                    <div className="rp-button-container">
                        <button className="profile-button">Change username</button>
                    </div>
                    <div className="rp-button-container">
                        <button className="profile-button">Change email</button>
                    </div>
                    <div className="rp-button-container">
                        <button className="profile-button">Change password</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;