import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStore } from './book-store/book-store';

import { SharedModule } from '../shared/shared-module';
import { UserOrders } from '../users/user-orders/user-orders';
import { Maintenance } from './maintenance/maintenance';
import { ReturnBook } from './return-book/return-book';


@NgModule({
  declarations: [
    BookStore,
    Maintenance,
    ReturnBook,
  ],
  imports: [
    
    SharedModule
  ]
})
export class BooksModule { }
