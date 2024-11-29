import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPorteroComponent } from './view-portero.component';

describe('ViewPorteroComponent', () => {
  let component: ViewPorteroComponent;
  let fixture: ComponentFixture<ViewPorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
