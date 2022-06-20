import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { ManageService } from 'app/services/manage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private manageS:ManageService,
    private formbuilder:FormBuilder,
    private _snackBar: MatSnackBar,
    private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      telephone:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){
      this.manageS.login(this.loginForm.value)
      .subscribe({
        next:(result:any)=>{
          console.log(result)
           if(result.statut){
            localStorage.setItem('user',JSON.stringify(result.data))
            this.SavedSuccessful(0)
            this._router.navigateByUrl('/admin/admin/dashboard')
           }else{
              this.SavedSuccessful(1)
           }
        },
        error:(error)=>{
          console.log(error);
        }
      })
  }

  
  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('Authentification réussie !', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('Paramétres de connexion incorrects!', 'Close', {
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

}
