export class Ricerca {
    from: Date;
    to: Date;
    utenti: Number[];

    constructor(from: Date, to: Date){
        this.from = from;
        this.to = to;
    }
}