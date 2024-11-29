import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPorteroComponent } from './sidebar-portero.component';

describe('SidebarPorteroComponent', () => {
  let component: SidebarPorteroComponent;
  let fixture: ComponentFixture<SidebarPorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
