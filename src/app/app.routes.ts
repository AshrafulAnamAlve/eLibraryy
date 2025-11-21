import { Routes } from '@angular/router';
import { PageNotFound } from './shared/component/page-not-found/page-not-found';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { BookStore } from './books/book-store/book-store';
import { UserOrders } from './users/user-orders/user-orders';
import { Profile } from './users/profile/profile';
import { Maintenance } from './books/maintenance/maintenance';
import { ReturnBook } from './books/return-book/return-book';
import { ApprovalRequests } from './users/approval-requests/approval-requests';
import { AllOrders } from './users/all-orders/all-orders';
import { ViewUsers } from './users/view-users/view-users';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: BookStore },
  { path: 'my-orders', component: UserOrders },
  { path: 'maintenance', component: Maintenance },
  { path: 'return-book', component: ReturnBook },
  {path: 'approval-requests', component:ApprovalRequests},
  {path: 'all-orders', component:AllOrders},
  {path:"view-users", component:ViewUsers},
  {path: 'profile', component:Profile},
  { path: '**', component: PageNotFound },
];
