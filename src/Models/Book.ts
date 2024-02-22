import User from "./User";

class Book {
    public bookId:number = 0;
    public userId:number = 0;

    public name:string = "";
    public description:string = "";
    public authorFullName:string = "";
    public genre:string = "";
    public pageCount:number = 0;
    public price:number = 0;

    public likes:number = 0;
    public dislikes:number = 0;

    public uploadedUser:User = new User();
}

export default Book;