import ConnectionHandler from "../Models/ConnectionHandler";
import {serverIp, serverPort} from "../App";
import BooksList from "./BooksList";
import Book from "../Models/Book";

function Home() {
    if(sessionStorage['jwt'] !== null && sessionStorage['jwt'] !== undefined) {
        console.log(`jwt token is ${sessionStorage['jwt']}`)
    }

    return (
        <div>
            <BooksList/>
        </div>
    )
}

export {Home};