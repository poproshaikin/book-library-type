import React, {useState} from "react";
import "./TopBar.css"
import OptionsModal from "./OptionsModal";

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
            <nav className="nav-menu">
                <h1>Book Library</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signUp">Sign up</a></li>
                    {isAuthorized() && (
                        <div>
                            <li><a onClick={toggleModal}>⋮</a></li>
                            <OptionsModal showModal={showModal} onClose={toggleModal}/>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export {TopBar}