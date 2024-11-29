import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayJuniorComponent } from './birthday-junior.component';

describe('BirthdayJuniorComponent', () => {
  let component: BirthdayJuniorComponent;
  let fixture: ComponentFixture<BirthdayJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
