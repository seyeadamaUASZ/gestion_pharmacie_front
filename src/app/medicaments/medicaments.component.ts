import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Medicament } from 'app/model/medicament.model';
import { ManageService } from 'app/services/manage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
   data:any;
   medicamentForm: any;
   medicament:Medicament = new Medicament();
   categories:any;

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   medicamentId:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private manageS:ManageService,private formbulider: FormBuilder, 
    private _snackBar: MatSnackBar) { 
    this.allMedicaments();
    this.allCategories();
  }

  ngOnInit(): void {
    
    this.medicamentForm = this.formbulider.group({
      nomMedicament: ['', [Validators.required]],
      prixu: ['', [Validators.required]],
      stock:['',[Validators.required]],
      categorie:[],
      urlImage:['',]
  });
}

allCategories(){
  this.manageS.allCategories().subscribe({
    next:(result)=>{
      this.categories = result.data;
      console.log(this.categories);
    },
    error:(error)=>{
      console.log(error);
    }
  })
}


  onSubmit(){
    const medicament = this.medicamentForm.value;
    console.log(medicament);
    this.createMedicament(medicament);
    this.medicamentForm.reset();
  }

  createMedicament(medicament:Medicament){
    if (this.medicamentId == null) {
      this.manageS.saveMedicament(medicament).subscribe(
        () => {
          //this.dataSaved = true;
          this.SavedSuccessful(1);
          this.allMedicaments();
          this.medicamentId = null;
          this.medicamentForm.reset();
        }
      );
     }else {
      medicament.id = this.medicamentId;
      this.manageS.saveMedicament(medicament).subscribe(() => {
        
        this.SavedSuccessful(0);
        this.allMedicaments();
        this.medicamentId = null;
        this.medicamentForm.reset();
      });
    }
  }


  deleteMedicament(id:any){
    if (confirm("Etes vous sur de la suppression ?")) {
      this.manageS.deleteMedicament(id).subscribe( {
        // this.dataSaved = true;
       next:()=>{
        this.SavedSuccessful(2);
        this.allMedicaments();
        this.medicamentId = null;
        this.medicamentForm.reset();
       },
       error:(error)=>{
         console.error(error);
       }
 
      });
    }

  }
  
  //verifier si c'est vide

  public isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
  
    return true;
  }


  loadMedicamentToEdit(id:any){
    this.manageS.getMedicament(id).subscribe({
      next:((result:any)=>{
        //this.massage = null;
        //this.dataSaved = false;
        this.medicament = result!.data;  
        this.medicamentId = id;
        this.medicamentForm.controls['nomMedicament'].setValue(this.medicament.nomMedicament);
        this.medicamentForm.controls['stock'].setValue(this.medicament.stock);
        this.medicamentForm.controls['prixu'].setValue(this.medicament.prixu);
        this.medicamentForm.controls['categorie'].setValue(this.medicament.categorie);
        this.medicamentForm.controls['urlImage'].setValue(this.medicament.urlImage);
      
      })
      
    });

  }



  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('Médicament mis à jour avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('Médicament ajouté avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Médicament supprimé !', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  allMedicaments(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.manageS.allMedicament().subscribe({
      next: (result:any)=>{
        console.log(result)
        this.data = result.data;
        this.dtTrigger.next(this.data);
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
