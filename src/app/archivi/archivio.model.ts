import { Posizione } from "../posizioni/posizione.model";

export class Archivio {
    id: number;
    rappr_timestamp: string;
	rappr_posizioni: string;
    acquistabile: boolean;
    
    posizioni: Posizione[];

    constructor(posizioni: Posizione[]){
        this.posizioni = posizioni;
    }
}