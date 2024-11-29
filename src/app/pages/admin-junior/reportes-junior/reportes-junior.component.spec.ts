import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesJuniorComponent } from './reportes-junior.component';

describe('ReportesJuniorComponent', () => {
  let component: ReportesJuniorComponent;
  let fixture: ComponentFixture<ReportesJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
