export class Ricerca {
    from: Date;
    to: Date;
    utenti: string[];
    polygon: any;

    constructor(from: Date, to: Date, utenti: string[], polygon){
        this.from = from;
        this.to = to;
        this.utenti = utenti;
        this.polygon = polygon;
    }
}