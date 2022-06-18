import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Categorie } from 'app/model/categorie.model';
import { ManageService } from 'app/services/manage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  data:any;
  categorieForm:any;
  categorie:Categorie = new Categorie();
  categorieId:any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 dtOptions1: DataTables.Settings = {};
 
 dtTrigger1: Subject<any> = new Subject<any>();
  constructor(private manageS:ManageService,
    private formBuilder:FormBuilder,private _snackBar: MatSnackBar,) { }
  
    ngAfterViewInit(): void {
    //this.dtTrigger1.next();
  }

  ngOnInit(): void {
    this.dtOptions1 = {
      destroy: true,
      ordering: true,
      pagingType: "full_numbers",
      columnDefs: [{ 
        targets: 0,
    }]
    };
   this.categorieForm = this.formBuilder.group({
    nom:['',Validators.required],
    urlCategorie:['']
   });

  
   

    this.allCategories();
  }

  allCategories(){
    this.manageS.allCategories().subscribe({
      next:(result:any)=>{
        this.data = result.data;
        this.dtTrigger1.next(this.data);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }


  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('catégorie mis à jour avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('catégorie ajoutée avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('catégorie supprimée !', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }


  onSubmit(){
    const categorie = this.categorieForm.value;
    this.createCategorie(categorie);
    this.categorieId = null;
    this.categorieForm.reset();
  }


  loadCategorieToEdit(id:any){
    this.manageS.getCategorie(id).subscribe({
      next:((result:any)=>{
        //this.massage = null;
        //this.dataSaved = false;
        this.categorie = result!.data;  
        this.categorieId = id;
        this.categorieForm.controls['nom'].setValue(this.categorie.nom);
        this.categorieForm.controls['urlCategorie'].setValue(this.categorie.urlCategorie);
       
      })
    });
  }

  deleteCategorie(id:any){
    if (confirm("Etes vous sur de la suppression ?")) {
      this.manageS.deleteCategorie(id).subscribe( {
        // this.dataSaved = true;
       next:()=>{
        this.SavedSuccessful(2);
        this.allCategories();
        this.categorieId = null;
        this.categorieForm.reset();
       },
       error:(error)=>{
         console.error(error);
       }
 
      });
    }
  }


  createCategorie(categorie:Categorie){
    if(this.categorieId==null){
      this.manageS.saveCategorie(categorie)
      .subscribe({
        next:(result:any)=>{
          this.allCategories();
          this.SavedSuccessful(1);
          this.categorieId=null;
          this.categorieForm.reset(); 
        }
      })
    }else{
      categorie.id = this.categorieId;
      this.manageS.saveCategorie(categorie).subscribe(() => {
        
        this.SavedSuccessful(0);
        this.allCategories();
        this.categorieId = null;
        this.categorieForm.reset();
      });
     }
  }

}
