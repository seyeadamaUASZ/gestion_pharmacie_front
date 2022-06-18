import { Component, OnInit } from '@angular/core';
import { ManageService } from 'app/services/manage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {  Client } from 'app/model/client.model';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
   data:any;
   clientForm: any;
   client:Client = new Client();

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   clientId:any;

  dtOptions1: DataTables.Settings = {};
  
  dtTrigger1: Subject<any> = new Subject<any>();
  constructor(private manageS:ManageService,private formbulider: FormBuilder, 
    private _snackBar: MatSnackBar) { 
      this.dtOptions1 = {
      };
    }
    

  ngOnInit(): void {
    this.allClient();

    this.clientForm = this.formbulider.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone:['',[Validators.required]],
      adresse:['',Validators.required],
      credit:['',]
  });
  }

  loadClientToEdit(id:any){
    this.manageS.getClient(id).subscribe({
      next:((result:any)=>{
        //this.massage = null;
        //this.dataSaved = false;
        this.client = result!.data;  
        this.clientId = id;
        this.clientForm.controls['nom'].setValue(this.client.nom);
        this.clientForm.controls['prenom'].setValue(this.client.prenom);
        this.clientForm.controls['adresse'].setValue(this.client.adresse);
        this.clientForm.controls['telephone'].setValue(this.client.telephone);
        this.clientForm.controls['credit'].setValue(this.client.credit);
      
      })
      
    });

  }

  allClient(){
    
    this.manageS.allCLient().subscribe({
      next:(result:any)=>{
        this.data = result.data;
        console.log(this.data);
        this.dtTrigger1.next(this.data);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  createClient(client:Client){
    if (this.clientId == null) {
      this.manageS.saveClient(client).subscribe(
        () => {
          //this.dataSaved = true;
          this.SavedSuccessful(1);
          this.allClient();
          this.clientId = null;
          this.clientForm.reset();
        }
      );
     }else{
      client.id = this.clientId;
      this.manageS.saveClient(client).subscribe(() => {
        
        this.SavedSuccessful(0);
        this.allClient();
        this.clientId = null;
        this.clientForm.reset();
      });
     }
  } 
  onSubmit(){
    const client = this.clientForm.value;
    this.createClient(client);
    this.clientForm.reset();
  }


  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('client mis à jour avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('client ajouté avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('client supprimé !', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  deleteClient(id:any){
    if (confirm("Etes vous sur de la suppression ?")) {
      this.manageS.deleteClient(id).subscribe( {
        // this.dataSaved = true;
       next:()=>{
        this.SavedSuccessful(2);
        this.allClient();
        this.clientId = null;
        this.clientForm.reset();
       },
       error:(error)=>{
         console.error(error);
       }
 
      });
    }

  }


  ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
  }

}
