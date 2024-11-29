import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBirthdayJuniorComponent } from './list-birthday-junior.component';

describe('ListBirthdayJuniorComponent', () => {
  let component: ListBirthdayJuniorComponent;
  let fixture: ComponentFixture<ListBirthdayJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBirthdayJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBirthdayJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
