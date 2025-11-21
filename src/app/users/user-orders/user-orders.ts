import { Component } from '@angular/core';
import { Order } from '../../models/models';
import { Api } from '../../shared/services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-orders',
  standalone: false,
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss'
})
export class UserOrders {
  columnsForPendingReturns: string[]=[
    'orderId','bookId','bookTitle','orderDate','fineToPay',
  ];
   columnsForCompletedReturns: string[]=[
    'orderId','bookId','bookTitle','orderDate','returnDate','fineToPay',
  ];
  pendingReturns: Order[]=[];
  completedReturns: Order[]=[];

 constructor(private apiService: Api, private snackBar: MatSnackBar) {
  let userId = this.apiService.getUserInfo()!.id;

  apiService.getOrdersOfUser(userId).subscribe({
    next: (res: Order[]) => {
      console.log(res);
      // Example: categorize orders
      this.pendingReturns = res.filter(o => !o.returned);
      this.completedReturns = res.filter(o => o.returned);
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Failed to fetch orders', 'Close', { duration: 3000 });
    },
  });
}
getFineToPay(order: Order){
  return this.apiService.getFine(order);
}

}
