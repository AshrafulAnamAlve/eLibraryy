import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../material/material-module';
import { PageHeader } from './component/page-header/page-header';
import { PageFooter } from './component/page-footer/page-footer';
import { PageSideNav } from './component/page-side-nav/page-side-nav';
import { RouterModule } from '@angular/router';
import { PageNotFound } from './component/page-not-found/page-not-found';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageTable } from './component/page-table/page-table';


@NgModule({
  declarations: [
    PageHeader,
    PageFooter,
    PageSideNav,
    PageNotFound,
    PageTable
  ],
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule],
  exports:[CommonModule,MaterialModule,PageHeader,PageFooter,PageSideNav,RouterModule,PageNotFound,ReactiveFormsModule,PageTable],
})
export class SharedModule { }
