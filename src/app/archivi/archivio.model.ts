import { Posizione } from "../posizioni/posizione.model";

export class Archivio {
    id: number;
    acquisti: number;
    rappr_timestamp: string;
	rappr_posizioni: string;
    acquistabile: boolean;
    acquistato: boolean;
    utente: string;
    
    posizioni: Posizione[];

    constructor(posizioni: Posizione[]){
        this.posizioni = posizioni;
    }
}