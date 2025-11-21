import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSideNav } from './page-side-nav';

describe('PageSideNav', () => {
  let component: PageSideNav;
  let fixture: ComponentFixture<PageSideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSideNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSideNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
