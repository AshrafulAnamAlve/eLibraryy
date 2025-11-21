import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'page-header',
  standalone: false,
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss'
})
export class PageHeader {
  loggedIn:boolean = false;
  name: string='';
  constructor(private apiService: Api){
    apiService.userStatus.subscribe({
      next:(res)=>{
        if(res == 'loggedIn'){
          this.loggedIn = true;
          let user = apiService.getUserInfo()!;
          this.name = `${user.firstName} ${user.lastName}`;
        }else{
          this.loggedIn=false;
          this.name='';
        }
      }
    })
  }
  logout(){
    this.apiService.logout();
  }
}
