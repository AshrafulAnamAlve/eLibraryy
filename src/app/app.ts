import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared-module';
import { AuthModule } from './auth/auth-module';
import { Api } from './shared/services/api';
import { UsersModule } from './users/users-module';
import { BooksModule } from './books/books-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    AuthModule,
    UsersModule,
    BooksModule
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit{
   title = signal('UI');
   constructor(private apiservice: Api){}

   ngOnInit(): void {
     let status = this.apiservice.isLoggedIn()? 'loggedIn':'loggedOff';
     this.apiservice.userStatus.next(status);
   }
}
