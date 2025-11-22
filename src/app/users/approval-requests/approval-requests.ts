import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared-module";
import { AccountStatus, User } from '../../models/models';
import { Api } from '../../shared/services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'approval-requests',
  imports: [SharedModule],
  templateUrl: './approval-requests.html',
  styleUrl: './approval-requests.scss'
})
export class ApprovalRequests {
  columns: string[] = ['userId','userName', 'email','userType','createdOn','approve'];
  users: User[] =[];

  constructor(private apiService: Api, private snackBar: MatSnackBar){
    apiService.getUsers().subscribe({
      next: (res: User[])=>{
        console.log(res);
        this.users = res.filter(
          (r)=> r.accountStatus == AccountStatus.UNAPROOVED
        );
      },
    });
  }

  approve(user: User){
    this.apiService.approveRequest(user.id).subscribe({
      next: (res)=>{
        if(res ==='approved'){
          this.snackBar.open(`Approved for ${user.firstName}`,'OK');
        }else this.snackBar.open(`Not Approved`,'OK');
      }
    })
  }
}
