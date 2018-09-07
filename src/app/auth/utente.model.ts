export class Utente {
    username: string;
    password: string;
    id : number;

    constructor(username: string, password:string){
        this.username = username;
        this.password = password;
    }
}