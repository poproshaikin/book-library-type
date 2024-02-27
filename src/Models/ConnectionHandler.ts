import Book from "./Book";
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

    public async getAllBooks():Promise<Book[] | null> {
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
            return null;
        }

    }

    public async getBookById(id:number) {
        const url = `http://${this.ServerIp}:${this.ServerPort}/books/book?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }

        let book:Book;

        try {
            const response = await fetch(url, options);
            const json = await response.text();
            book = JSON.parse(json);
        } catch (e) {
            console.error(e);
            book = new Book();
        }

        return book;
    }

    public async signupUser(user:User) {
        const url = `http://${this.ServerIp}:${this.ServerPort}/users/signUp`;
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
        const url = `http://${this.ServerIp}:${this.ServerPort}/users/userByToken`;
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

    public async addNewBook(book:Book) {
        const url=`http://${this.ServerIp}:${this.ServerPort}/books/addNewBook`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${sessionStorage['jwt']}`
            },
            body: JSON.stringify(book)
        };

        let responseText;

        try {
            const response = await fetch(url, options);
            responseText = await response.text();
        } catch {
            responseText = 'Failed'
        }

        return responseText;
    }

    public async like(token:string, bookId:number) {

        if(bookId === -1) {
            return 'Failed';
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        };
        const url = `http://${this.ServerIp}:${this.ServerPort}/likes/like?bookId=${bookId}`

        try {
            const response = await fetch(url, options);
            return await response.text();
        } catch {
            return 'Failed';
        }
    }

    public async changeName(name:string, token:string) {
        const url = `http://${this.ServerIp}:${this.ServerPort}/users/changeName`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(name)
        }

        let responseText;

        try {
            const response = await fetch(url, options);
            responseText = await response.text();
        } catch {
            responseText = 'Failed'
        }

        return responseText;
    }

    public async changeSurname(surname:string, token:string) {

    }

    public async changeUsername(username:string, token:string) {

    }

    public async changeEmail(email:string, token:string) {

    }

    public async changePassword(password:string, token:string) {

    }

    public static sha256(input:string) {
        return CryptoJS.SHA256(input).toString();
    }
}

export default ConnectionHandler;