import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTable } from './page-table';

describe('PageTable', () => {
  let component: PageTable;
  let fixture: ComponentFixture<PageTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
