import "./OptionsModal.css"

function OptionsModal({showModal, onClose}) {

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-title-container">
                            <h4>Your account</h4>
                        </div>
                        <br/>
                        <div className="modal-links container">
                            <a href="/profile">· Profile</a>
                            <p>· Add book</p>
                            <p>· Sign out</p>
                        </div>

                        {/*<button onClick={onClose}>Close</button>*/}
                    </div>
                </div>
            )}
        </>
    )
}

export default OptionsModal;