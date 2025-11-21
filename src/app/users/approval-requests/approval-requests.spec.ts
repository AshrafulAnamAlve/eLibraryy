import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequests } from './approval-requests';

describe('ApprovalRequests', () => {
  let component: ApprovalRequests;
  let fixture: ComponentFixture<ApprovalRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
