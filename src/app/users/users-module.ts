import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrders } from './user-orders/user-orders';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared-module';
import { Profile } from './profile/profile';
import { AllOrders } from './all-orders/all-orders';
import { ViewUsers } from './view-users/view-users';



@NgModule({
  declarations: [
    UserOrders,
    Profile,
    AllOrders,
    ViewUsers
  ],
  imports: [
    SharedModule
  ]
})
export class UsersModule { }


