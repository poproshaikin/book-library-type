import React, {useState} from "react";
import "./TopBar.css"
import OptionsModal from "./OptionsModal"

interface ShowModalState {
    showModal: boolean
}

class TopBar extends React.Component<{}, ShowModalState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    isAuthorized():boolean {
        return sessionStorage['jwt'] !== undefined;
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        return (
            <div>
                <div className="nav-menu">
                    <div className="nav-title-container">
                        <h1>Bookin'</h1>
                    </div>
                    <div className="nav-constant-buttons">
                        <p><a href="/">Home</a></p>
                        <p><a href="/login">Login</a></p>
                        <p><a href="/signUp">Sign up</a></p>
                    </div>
                    <div className="nav-optional-buttons">
                        {this.isAuthorized() && (
                            <div>
                                <img className="profile-logo" alt="profile" src="userImage.png" onClick={this.toggleModal}/>
                                <OptionsModal showModal={this.state.showModal} onClose={this.toggleModal}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

export {TopBar}