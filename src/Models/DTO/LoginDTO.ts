class LoginDTO {
    public Username?:string;
    public Email?:string;
    public Password:string;

    public constructor(password:string, username?:string, email?:string) {
        this.Username = username;
        this.Email = email;
        this.Password = password;
    }
}

export default LoginDTO