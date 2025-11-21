import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { SharedModule } from '../shared/shared-module';

@NgModule({

  imports: [
    CommonModule,
    SharedModule,
    RegisterComponent,  // standalone component imports এ দিবে
    LoginComponent      // standalone component imports এ দিবে
  ],
})
export class AuthModule {}
