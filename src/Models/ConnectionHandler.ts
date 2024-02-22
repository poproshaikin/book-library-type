import Book from "./Book";
import {serverIp, serverPort} from "../App";
import User from "./User";
import CryptoJS from 'crypto-js';
import LoginDTO from "./DTO/LoginDTO";

class ConnectionHandler {
    public ServerIp:string;
    public ServerPort:number;

    public constructor(serverIp:string, serverPort:number) {
        this.ServerIp = serverIp;
        this.ServerPort = serverPort;
    }

    public async getAllBooks() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = `http://${this.ServerIp}:${this.ServerPort}/books`;

        try {
            const response = await fetch(url, options);
            const json = await response.text();
            const jsonArray: any[] = JSON.parse(json);

            const books = jsonArray.map(item => {
                let book:Book = new Book();

                book.bookId = item.bookId;
                book.userId = item.userId;
                book.name = item.name;
                book.description = item.name;
                book.authorFullName = item.authorFullName;
                book.genre = item.genre;
                book.pageCount = item.pageCount;
                book.price = item.price;
                book.likes = item.likes;
                book.dislikes = item.dislikes;
                book.uploadedUser = item.uploadedUser;

                return book;
            });

            return books;
        } catch {
            return [];
        }

    }

    public async getBookById(id:number) {
        const url = `http://${serverIp}:${serverPort}/books/book?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }

        const response = await fetch(url, options);
        const json = await response.text();
        let book: Book = JSON.parse(json);
        return book;
    }

    public async signupUser(user:User) {
        const url = `http://${serverIp}:${serverPort}/users/signUp`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        };

        let responseText:string;

        try {
            const response = await fetch(url, options);

            responseText = await response.text();

        } catch (error) {
            console.error(error);
            responseText = "Failed";
        }

        return responseText;
    }

    public async loginUser(loginDto:LoginDTO) {
        const url = `http://${this.ServerIp}:${this.ServerPort}/users/login`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginDto)
        };

        let responseText;

        try {
            const response = await fetch(url, options);
            responseText = await response.text();
        } catch {
            responseText = 'Failed';
        }

        return responseText;
    }

    public async getUserByToken(token:string) {
        const url = `http://${serverIp}:${serverPort}/users/userByToken`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(token)
        };

        try {
            const response = await fetch(url, options);
            const responseText = await response.text();
            const user:User = JSON.parse(responseText);
            return user;
        } catch {
            return null;
        }

    }

    public static sha256(input:string) {
        return CryptoJS.SHA256(input).toString();
    }
}

export default ConnectionHandler;