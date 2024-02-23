import React, {useState} from "react";
import "./TopBar.css"
import OptionsModal from "./OptionsModal"

function TopBar() {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    function isAuthorized():boolean {
        if(sessionStorage['jwt'] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            <div className="nav-menu">
                <div className="nav-title-container">
                    <h1>Book Library</h1>
                </div>
                <div className="nav-constant-buttons">
                    <p><a href="/">Home</a></p>
                    <p><a href="/login">Login</a></p>
                    <p><a href="/signUp">Sign up</a></p>
                </div>
                <div className="nav-optional-buttons">
                    {isAuthorized() && (
                        <div>
                            <img className="profile-logo" alt="profile" src="user.png" onClick={toggleModal}/>
                            <OptionsModal showModal={showModal} onClose={toggleModal}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export {TopBar}