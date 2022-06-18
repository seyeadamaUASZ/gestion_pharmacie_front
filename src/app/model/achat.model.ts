import { Client } from "./client.model";
import { Medicament } from "./medicament.model";

export class Achat{
    id:number;
    medicament:Medicament;
    client:Client;
    quantite:number;
    totalPrice:number;
    typeAchat:string;
}