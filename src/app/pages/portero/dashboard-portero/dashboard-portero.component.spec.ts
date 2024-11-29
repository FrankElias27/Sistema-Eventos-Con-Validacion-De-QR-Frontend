import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPorteroComponent } from './dashboard-portero.component';

describe('DashboardPorteroComponent', () => {
  let component: DashboardPorteroComponent;
  let fixture: ComponentFixture<DashboardPorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
