import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarJuniorComponent } from './sidebar-junior.component';

describe('SidebarJuniorComponent', () => {
  let component: SidebarJuniorComponent;
  let fixture: ComponentFixture<SidebarJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
