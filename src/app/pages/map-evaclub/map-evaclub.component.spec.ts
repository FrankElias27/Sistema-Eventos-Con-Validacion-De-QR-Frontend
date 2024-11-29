import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEvaclubComponent } from './map-evaclub.component';

describe('MapEvaclubComponent', () => {
  let component: MapEvaclubComponent;
  let fixture: ComponentFixture<MapEvaclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapEvaclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapEvaclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
