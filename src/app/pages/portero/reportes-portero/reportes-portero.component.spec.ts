import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPorteroComponent } from './reportes-portero.component';

describe('ReportesPorteroComponent', () => {
  let component: ReportesPorteroComponent;
  let fixture: ComponentFixture<ReportesPorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesPorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
