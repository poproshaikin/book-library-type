import Book from "../Models/Book";
import ConnectionHandler from "../Models/ConnectionHandler";
import {serverIp, serverPort} from "../App";
import {useEffect, useState} from "react";
import "./BooksList.css"
import {useNavigate} from "react-router-dom";

function BooksList() {

    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[] | null>(null);

    let connHandler = new ConnectionHandler(serverIp, serverPort);

    useEffect(() => {
        connHandler.getAllBooks()
            .then(booksList => {
                if(booksList !== null) {
                    setBooks(booksList)
                }
            })
    }, []);

    if(books === null) {
        return (
            <div>
                Failed to load books list...
            </div>)
    }

    if(books.length === 0) {
        return (
            <div>
                Nothing to show...
            </div>
        )
    }

    function handleNav(book:Book) {
        navigate(`/book/${book.bookId}`)
    }

    return (
        <div className="main-container">
            {books.map((book, index) => (
                <div className="book-item" onClick={() => handleNav(book)}>
                    <h3>{book.name}</h3>
                    <h5>{book.authorFullName}</h5>
                </div>
            ))}
        </div>
    )
}

export default BooksList;