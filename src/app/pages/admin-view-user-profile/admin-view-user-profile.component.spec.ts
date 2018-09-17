import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserProfileComponent } from './admin-view-user-profile.component';

describe('AdminViewUserProfileComponent', () => {
  let component: AdminViewUserProfileComponent;
  let fixture: ComponentFixture<AdminViewUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
