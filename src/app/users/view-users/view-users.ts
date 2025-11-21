import { Component } from '@angular/core';
import { AccountStatus, User } from '../../models/models';
import { Api } from '../../shared/services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'view-users',
  standalone: false,
  templateUrl: './view-users.html',
  styleUrl: './view-users.scss'
})
export class ViewUsers {

  columns: string[]=[
    'userId',
    'userName',
    'email',
    'mobileNumber',
    'createdOn',
    'accountStatus',
    'unblock',
    'userType',
  ];

  users: User[]=[];
  constructor(private apiService:Api, private snackBar:MatSnackBar){
    apiService.getUsers().subscribe({
      next:(res: User[])=>{
        this.users =[];
        res.forEach((r)=> this.users.push(r));
      },
    });
  }

  unblockUser(user: User){
    var id = user.id;
    this.apiService.unblock(id).subscribe({
      next:(res)=>{
        if(res==='unblocked'){
          this.snackBar.open("User has been unblocked", "Ok");
        }else{
          this.snackBar.open("Not Unblocked","Ok")
        }
      }
    });
  }



}
