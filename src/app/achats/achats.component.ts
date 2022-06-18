import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Achat } from 'app/model/achat.model';
import { ManageService } from 'app/services/manage.service';
import { map, Observable, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-achats',
  templateUrl: './achats.component.html',
  styleUrls: ['./achats.component.css']
})
export class AchatsComponent implements OnInit {
  
  myControl = new FormControl('');
  myControl1 = new FormControl('');
  options= [];
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  nomMed=[];
  options1=[];
  codeAndName=[];
  achat:Achat = new Achat();
  achatForm:any;
  prixtotal:any=0;
  element:any;
  client:any;

  isCredit = false;
  isVente = false;

  data:any;

  prixU :any=0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  dtOptions1: DataTables.Settings = {};
  
  dtTrigger1: Subject<any> = new Subject<any>();
  constructor(private manageS:ManageService,
    private formBuilder:FormBuilder,private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.achatForm = this.formBuilder.group({
      client: [''],
      medicament:['',Validators.required],
      quantite:['',Validators.required],
      typeAchat:['credit',Validators.required],
      prixu:[''],
      totalPrice:['',Validators.required]
    })

    this.nomMed=[];
    //this.codeAndName=[];
    this.allMedicaments();
    this.allClients();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    ); 
     
    this.allAchats();
  
  }

  allClients(){
     this.manageS.allCLient().subscribe({
      next:(result:any)=>{
        this.options1 = result.data;
        for(var i =0;i<this.options1.length;i++){
          this.codeAndName.push(this.options1[i].id+'-'+this.options1[i].nom+' '+this.options1[i].prenom)
        } 
        this.filteredOptions1 = this.myControl1.valueChanges.pipe(
          startWith(''),
          map(value => this._filter1(value || '')),
        );
      },
      error:(error)=>{
          console.log(error);
      }
     })
  }


  allMedicaments(){
    this.manageS.allMedicament().subscribe({
      next:(result:any)=>{
         this.options = result.data;
         for(var i=0; i <this.options.length;i++){
          this.nomMed.push(this.options[i].nomMedicament)
         }
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  private _filter(value: string): string[] {
    console.log(' nom med '+this.nomMed)
    const filterValue = value.toLowerCase();
    return this.nomMed.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.codeAndName.filter(option => option.toLowerCase().includes(filterValue));
  }



  nameChanged(arg) {   
    const resultat = this.options.find( opt => opt.nomMedicament === arg);
    this.element = resultat;

    this.achatForm.controls['quantite'].setValue(resultat.stock);
    this.achatForm.controls['prixu'].setValue(resultat.prixu);
    this.prixU = resultat.prixu;
    const quantite = resultat.stock;

    this.prixtotal = this.prixU * quantite;


  }


  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('Transaction enregistrée à jour avec succés!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('Transaction enregistrée avec succés!', 'Close', {
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

    else if (isUpdate == 3) {
      this._snackBar.open('La quantité ne doit pas etre supérieur au stock disponible', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      
      });
    }
  }


  nameChanged2(arg){
    //console.log(this.element)
    const prixu = this.achatForm.controls['prixu'].value
    //console.log(quantite)
    console.log(this.element.stock < arg)
    if(this.element.stock < arg){
      this.SavedSuccessful(3)
    }else{
      this.prixtotal = prixu * arg;
    }

        
  }


  onSubmit(){
    this.achatForm.controls['medicament'].setValue(this.element)
    this.achatForm.controls['client'].setValue(this.client)
    this.achatForm.controls['totalPrice'].setValue(this.prixtotal)

    this.achat.client = this.achatForm.value.client;
    this.achat.medicament = this.achatForm.value.medicament;
    this.achat.quantite = this.achatForm.value.quantite;
    this.achat.totalPrice = this.achatForm.value.totalPrice;
    this.achat.typeAchat =this.achatForm.value.typeAchat;
    console.log(this.achat);
    this.createAchat(this.achat);
   
  }

  allAchats(){
     this.manageS.allAchats().subscribe({
      next:(result:any)=>{
        this.data=result.data
        console.log('les achats '+this.data)
        this.dtTrigger1.next(this.data);
      },
      error:(error)=>{
        console.log(error)
      }
     })
  }

  nameChanged1(arg){
    const identifiant = arg[0]
    this.manageS.getClient(identifiant).subscribe({
      next:(result:any)=>{
           this.client = result.data 
           console.log('client '+JSON.stringify(this.client))
      },
      error:(error)=>{
        console.log(error)
      }
    })
    
  }


  createAchat(achat:Achat){
    this.manageS.saveAchat(achat).subscribe({
      next:(result:any)=>{
        this.SavedSuccessful(1);
          this.allAchats();
          //this.clientId = null;
          this.achatForm.reset();
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
  }

}
