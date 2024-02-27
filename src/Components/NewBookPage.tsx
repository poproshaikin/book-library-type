import "./NewBookPage.css"
import Book from "../Models/Book";
import {useState} from "react";
import ConnectionHandler from "../Models/ConnectionHandler";
import {serverIp, serverPort} from "../App";
import {useNavigate} from "react-router-dom";

function NewBookPage() {

    const [uploaded, setUploaded] = useState(false);
    const navigate = useNavigate();

    function handleConfirm() {

        let connHandler = new ConnectionHandler(serverIp, serverPort);

        const name = (document.getElementById('name-input') as HTMLInputElement).value;
        const description = (document.getElementById('description-input') as HTMLInputElement).value;
        const author = (document.getElementById('author-input') as HTMLInputElement).value;
        const genre = (document.getElementById('genre-input') as HTMLInputElement).value;
        const pageCount = (document.getElementById('page-count-input') as HTMLInputElement).value;
        const price = (document.getElementById('price-input') as HTMLInputElement).value;

        if (
            name === "" ||
            description === "" ||
            author === "" ||
            genre === "" ||
            pageCount === "" ||
            price === ""
        ) {
            (document.getElementById('inform-p') as HTMLElement).textContent = "Fields cannot be empty";
        }

        let book = new Book();
        book.name = name;
        book.description = description;
        book.authorFullName = author;
        book.genre = genre;
        book.pageCount = parseInt(pageCount);
        book.price = parseInt(price);

        connHandler.addNewBook(book)
            .then(response => {

                console.log(response);

                if(response === 'Success') {
                    setUploaded(true);
                    navigate('/');
                } else if (response === 'Unauthorized') {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "Error: Unauthorized. Try to re-login";
                } else if (response === 'Book uploading blocked') {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "Book uploading is blocked";
                } else {
                    (document.getElementById('inform-p') as HTMLElement).textContent = "Failed to send data";
                }
            });
    }

    return (
        <div>
            <div className="nb-title-container">
                <h1>New book</h1>
            </div>
            <div className="nb-main-container">
                <div className="nb-left-panel">
                    <p className="nb-key">Name</p>
                    <input id="name-input" className="nb-input" placeholder="Name"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Description</p>
                    <textarea id="description-input" className="nb-input height-300" placeholder="Description"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Author full name</p>
                    <input id="author-input" className="nb-input" placeholder="Author full name"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Genre</p>
                    <input id="genre-input" className="nb-input" placeholder="Genre"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Page count</p>
                    <input id="page-count-input" className="nb-input" type="number" placeholder="Page count"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Price</p>
                    <input id="price-input" className="nb-input" type="number" placeholder="Price"/>
                    <br/>
                    <br/>
                </div>
                <div className="nb-right-panel">
                    <div className="nb-button-and-text-container">
                        <p id="inform-p"></p>
                        <button onClick={handleConfirm} className="nb-confirm-button">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBookPage;