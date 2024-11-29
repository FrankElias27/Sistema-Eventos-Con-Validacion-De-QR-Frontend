import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientesComponent } from './view-clientes.component';

describe('ViewClientesComponent', () => {
  let component: ViewClientesComponent;
  let fixture: ComponentFixture<ViewClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
