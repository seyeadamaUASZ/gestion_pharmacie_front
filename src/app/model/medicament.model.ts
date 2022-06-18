import { Categorie } from "./categorie.model";

export class Medicament{
    id:number;
    codeMedicament:String;
    nomMedicament:String;
    prixu:number;
    stock:number;
    categorie:Categorie;
    urlImage:String;
   
}