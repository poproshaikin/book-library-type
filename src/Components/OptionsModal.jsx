import "./OptionsModal.css"
import {useNavigate} from "react-router-dom";

function OptionsModal({showModal, onClose}) {

    const navigate = useNavigate();

    function handleSignOut() {
        sessionStorage.removeItem('jwt');
        onClose();
    }

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-title-container">
                            <h4>Your account</h4>
                        </div>
                        <br/>
                        <div className="modal-links-container">
                            <a href="/profile">· Profile</a>
                            <a href="/newBook">· Add book</a>
                            <a onClick={handleSignOut} href='/'>· Sign out</a>
                        </div>

                        {/*<button onClick={onClose}>Close</button>*/}
                    </div>
                </div>
            )}
        </>
    )
}

export default OptionsModal;