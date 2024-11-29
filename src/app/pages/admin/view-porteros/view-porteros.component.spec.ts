import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPorterosComponent } from './view-porteros.component';

describe('ViewPorterosComponent', () => {
  let component: ViewPorterosComponent;
  let fixture: ComponentFixture<ViewPorterosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPorterosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPorterosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
