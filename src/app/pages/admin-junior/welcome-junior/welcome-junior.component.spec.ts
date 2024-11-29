import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeJuniorComponent } from './welcome-junior.component';

describe('WelcomeJuniorComponent', () => {
  let component: WelcomeJuniorComponent;
  let fixture: ComponentFixture<WelcomeJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
