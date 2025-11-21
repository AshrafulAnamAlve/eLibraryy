import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStore } from './book-store';

describe('BookStore', () => {
  let component: BookStore;
  let fixture: ComponentFixture<BookStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
