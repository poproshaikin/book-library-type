import Book from "../Models/Book";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {serverIp, serverPort} from "../App";
import "./BookPage.css"
import ConnectionHandler from "../Models/ConnectionHandler";

function BookPage({reloadBookPage}:{reloadBookPage: () => void}) {

    let connHandler = new ConnectionHandler(serverIp, serverPort);
    const { id } = useParams();
    const [book, setBook] = useState<Book>();
    const [reloadState, setReloadState] = useState<boolean>(false);

    function handleLike() {
        connHandler.like(sessionStorage['jwt'], parseInt(id !== undefined ? id : "-1"))
            .then(response => {
                if(response === 'Success') {
                    reloadBookPage();
                    setReloadState(true);
                }
            });
    }

    useEffect(() => {
        let connHandler = new ConnectionHandler(serverIp, serverPort);
        connHandler.getBookById(parseInt(id !== undefined ? id : "-1"))
            .then(book => setBook(book));
    }, [])

    useEffect(() => {
        if (reloadState) {
            setReloadState(false);
        }
    }, [reloadState]);

    if(book === undefined) {
        return (
            <div className="loading">
                <h3>Loading...</h3>
            </div>
        )
    } else {
        return (
            <div>
                <div className="title-row">
                    <h1>{book.name}</h1>
                    <h3>{book.authorFullName}</h3>
                </div>
                <div className="book-container">
                    <div className="left-panel">
                        <p className="description">{book.description}</p>
                        <br/>
                        <p className="property"><strong>Genre</strong>: {book.genre}</p>
                        <p className="property"><strong>Pages Count</strong>: {book.pageCount}</p>
                        <p className="property"><strong>Price</strong>: {book.price} Kč</p>
                    </div>
                    <div className="right-panel">
                        <div className="uploaded-by-container">
                            <h1>Uploaded by </h1>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="user">
                            <p className="property">
                                <strong>Name</strong>: {book.uploadedUser.name} {book.uploadedUser.surname}
                            </p>
                            <p className="property"><strong>Username</strong>: {book.uploadedUser.username}</p>
                        </div>
                        <br/>
                        <br/>
                        <div className="buttons-container">
                            <div className="button-and-text">
                                <button onClick={handleLike}>👍🏻</button>
                                <p className="like-p">{book.likes}</p>
                            </div>
                            <div className="button-and-text">
                                <button>👎🏻</button>
                                <p className="dislike-p">{book.dislikes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookPage;