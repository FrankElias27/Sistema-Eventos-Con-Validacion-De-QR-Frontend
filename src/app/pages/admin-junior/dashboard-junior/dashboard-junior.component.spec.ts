import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJuniorComponent } from './dashboard-junior.component';

describe('DashboardJuniorComponent', () => {
  let component: DashboardJuniorComponent;
  let fixture: ComponentFixture<DashboardJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
