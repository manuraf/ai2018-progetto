export class Ricerca {
    from: Date;
    to: Date;
    utenti: string[];

    constructor(from: Date, to: Date, utenti: string[]){
        this.from = from;
        this.to = to;
        this.utenti = utenti;
    }
}