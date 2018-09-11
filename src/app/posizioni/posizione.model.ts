import { Archivio } from "../archivi/archivio.model";

export class Posizione {
    timestamp: Date;
    id: number;
    latitudine: number;
    longitudine: number;
    archivio: Archivio;

    constructor(timestamp: Date, latitudine: number,longitudine: number){
        this.timestamp = timestamp;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
    }

    
}