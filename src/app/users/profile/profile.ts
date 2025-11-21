import { Component } from '@angular/core';
import { Api } from '../../shared/services/api';
import { UserType } from '../../models/models';


export interface TableElement {
  name: string;
  value: string;
}

@Component({
  selector: 'profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  columns: string[] = ['name', 'value'];
  dataSource:TableElement[] = [];

  constructor(private apiService: Api) {
    let user = apiService.getUserInfo()!;
    this.dataSource = [
      { name: "Name", value: user.firstName + " " + user.lastName },
      { name: "Email", value: `${user.email}` },
      { name: "Mobile", value: `${user.mobileNumber}` },
      { name: "Account Status", value: `${user.accountStatus}` },
      { name: "Created On", value: `${user.createdOn}` },
      { name: "Type", value: `${UserType[user.userType]}` },
    ];
  }
}
