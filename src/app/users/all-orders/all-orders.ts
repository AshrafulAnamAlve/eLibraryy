import { Component } from '@angular/core';
import { Order } from '../../models/models';
import { Api } from '../../shared/services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'all-orders',
  standalone: false,
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss'
})
export class AllOrders {
  columnsForPendingReturns: string[]=[
    'orderId','userIdForOrder','userNameForOrder','bookId','orderDate','fineToPay',
  ];
  columnsForCompletedReturns: string[]=[
    'orderId','userId','userNameForOrder','bookId','orderDate', 'returnedDate','finePaid',
  ];

  showProgressBar: boolean = false;
  orderWithPendingReturn: Order[]=[];
  orderWithCompletedReturn: Order[]=[];

  constructor(private apiService: Api, private snackBar:MatSnackBar){
    apiService.getOrders().subscribe({
      next:(res: Order[])=>{
        this.orderWithPendingReturn = res.filter(o=> ! o.returned);
        this.orderWithCompletedReturn = res.filter(o=> o.returned);
      },
      error:(err)=>{
        this.snackBar.open('No Orders Found','Ok');
      },
    });
  }

  sendEmail(){
    this.showProgressBar = true;
    this.apiService.sendEmail().subscribe({
      next: (res)=>{
        if(res === 'sent'){
          this.snackBar.open('Email have been send to student!','OK');
          this.showProgressBar = false;
        }else{
          this.snackBar.open('Email have not been send!','Ok');
          this.showProgressBar = false;
        }
      },
    });
  }
  blockUsers(){
    this.showProgressBar = true;
    this.apiService.blockUsers().subscribe({
      next: (res)=>{
        if(res === 'blocked'){
          this.snackBar.open('Over Due User Account were BLOCKED!','Ok');
          this.showProgressBar = false;
        }else{
          this.snackBar.open('Not Blocked!','OK');
          this.showProgressBar = false;
        }
      },
    });
  }
}
