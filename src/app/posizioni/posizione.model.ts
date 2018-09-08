export class Posizione {
    timestamp: Date;
    id: number;
    latitudine: number;
    longitudine: number;

    constructor(timestamp: Date, latitudine: number,longitudine: number){
        this.timestamp = timestamp;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
    }

    
}