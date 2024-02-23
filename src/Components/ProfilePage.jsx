import ConnectionHandler from "../Models/ConnectionHandler";
import {serverIp, serverPort} from "../App";
import "./ProfilePage.css"
import {useState} from "react";
import User from "../Models/User";

function ProfilePage() {

    let connHandler = new ConnectionHandler(serverIp, serverPort);

    const [user, setUser] = useState(undefined);

    if(user === undefined) {

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

    console.log(user);

    return (
        <div>
            <div className="profile-title-container">
                <h1>{user.username}'s Profile</h1>
            </div>
            <div className="profile-main-container">
                <div className="profile-left-panel">
                    <p className="profile-key">Name</p>
                    <p className="profile-value">{user.name}</p>
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
                    <button className="profile-button">Change name</button>
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
}

export default ProfilePage;