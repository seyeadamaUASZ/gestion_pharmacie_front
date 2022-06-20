import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  api = environment.api; 
  constructor(private http:HttpClient) { }

  allCLient():Observable<any>{
    return this.http.get(this.api+'client')
  }

  saveClient(data:any):Observable<any>{
    return this.http.post(this.api+'client',data);
  }

  allMedicament():Observable<any>{
    return this.http.get(this.api+'medicament');
  }

  allCategories():Observable<any>{
    return this.http.get(this.api+"categorie");
  }

  saveCategorie(data:any){
    return this.http.post(this.api+'categorie',data)
  }

  getCategorie(id:any){
    return this.http.get(this.api+'categorie/'+id)
  }

  deleteCategorie(id:any){
    return this.http.get(this.api+'categorie/delete/'+id)
  }

  saveMedicament(data:any):Observable<any>{
    return this.http.post(this.api+'medicament',data);
  }

  deleteMedicament(id:any){
    return this.http.delete(this.api+'medicament/delete/'+id);
  }


  public getMedicament(id:any){
    return this.http.get(this.api+'medicament/'+id);
  }

  public getClient(id:any){
    return this.http.get(this.api+'client/'+id);
  }

  public deleteClient(id:any){
    return this.http.delete(this.api+'client/delete/'+id);
  }

  public countClient(){
    return this.http.get(this.api+'client/count')
  }

  public countMedicaments(){
    return this.http.get(this.api+'medicament/count');
  }

  public countAchats(){
    return this.http.get(this.api+'achat/count');
  }


  public allAchats(){
    return this.http.get(this.api+'achat');
  }

  public saveAchat(data:any){
    return this.http.post(this.api+'achat',data)
  }

  public login(data:any){
    return this.http.post(this.api+'auth/login',data)
  }

  

}
