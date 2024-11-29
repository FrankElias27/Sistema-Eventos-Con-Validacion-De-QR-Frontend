import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListasComponent } from './view-listas.component';

describe('ViewListasComponent', () => {
  let component: ViewListasComponent;
  let fixture: ComponentFixture<ViewListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
