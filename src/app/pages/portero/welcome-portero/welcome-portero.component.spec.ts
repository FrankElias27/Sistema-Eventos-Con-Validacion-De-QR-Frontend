import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePorteroComponent } from './welcome-portero.component';

describe('WelcomePorteroComponent', () => {
  let component: WelcomePorteroComponent;
  let fixture: ComponentFixture<WelcomePorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomePorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomePorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
