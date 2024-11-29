import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosEvaclubComponent } from './eventos-evaclub.component';

describe('EventosEvaclubComponent', () => {
  let component: EventosEvaclubComponent;
  let fixture: ComponentFixture<EventosEvaclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosEvaclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosEvaclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
