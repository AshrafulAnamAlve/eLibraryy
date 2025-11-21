import { Component, EventEmitter, Input, Output } from '@angular/core';
import { first } from 'rxjs';
import { AccountStatus, Order, User, UserType } from '../../../models/models';
import { DatePipe } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'page-table',
  standalone: false,
  templateUrl: './page-table.html',
  styleUrl: './page-table.scss'
})
export class PageTable {
  @Input()
  columns: string[] = [];

  @Input()
  dataSource: any[]=[];

  @Output()
  approve = new EventEmitter<User>()

    @Output()
  unblock = new EventEmitter<User>()

  constructor(private apiSerive: Api){}

  getFineToPay(order:Order){
    return this.apiSerive.getFine(order);
  }

  getAccountStatus(input:AccountStatus){
    return AccountStatus[input];
  }
}
