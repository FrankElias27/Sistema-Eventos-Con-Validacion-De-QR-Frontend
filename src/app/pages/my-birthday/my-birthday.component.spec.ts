import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBirthdayComponent } from './my-birthday.component';

describe('MyBirthdayComponent', () => {
  let component: MyBirthdayComponent;
  let fixture: ComponentFixture<MyBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBirthdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
