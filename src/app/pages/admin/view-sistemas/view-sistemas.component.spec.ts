import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSistemasComponent } from './view-sistemas.component';

describe('ViewSistemasComponent', () => {
  let component: ViewSistemasComponent;
  let fixture: ComponentFixture<ViewSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSistemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
