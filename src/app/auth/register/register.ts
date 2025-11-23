import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared-module";
import { Api } from '../../shared/services/api';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [MatSnackBarModule, SharedModule],

})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: Api,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = fb.group({
      firstName: fb.control('', [Validators.required]),
      lastName: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.required]),
      mobileNumber: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
      rpassword: fb.control('', [Validators.required]),
    });
  }

  register() {
    let user = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      mobileNumber: this.registerForm.get('mobileNumber')?.value,
      password: this.registerForm.get('password')?.value,
    };

  this.apiService.register(user).subscribe({
    next: (res) => {
      if(res === 'Email already exists'){
        this.snackBar.open('This Email Is already register','Ok',{duration: 3000})
      }
    },
    error: (err) => this.snackBar.open('Registration failed', 'OK', { duration: 3000 })
  });
}
}
