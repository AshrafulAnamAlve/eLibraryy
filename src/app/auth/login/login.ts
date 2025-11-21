import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared-module";
import { Api } from '../../shared/services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [SharedModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private apiservice: Api,
    private snackBar: MatSnackBar
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  
  login(){
    let loginInfo={
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.apiservice.login(loginInfo).subscribe({
      next: (res)=>{
       if(res == 'not found')
        this.snackBar.open('Credential are invalid', 'OK');
      else if(res=='unapproved')
        this.snackBar.open('Your Account is not Aproved Yet by admin','OK');
      else if(res=='blocked')
        this.snackBar.open('Your Account is blocked please go to admin office to unblock','OK');
      else{
        localStorage.setItem('access_token',res);
        this.apiservice.userStatus.next("loggedIn");
      }
      },
    });
  }
}
