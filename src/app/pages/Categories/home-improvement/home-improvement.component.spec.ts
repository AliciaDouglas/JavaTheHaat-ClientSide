import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImprovementComponent } from './home-improvement.component';

describe('HomeImprovementComponent', () => {
  let component: HomeImprovementComponent;
  let fixture: ComponentFixture<HomeImprovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeImprovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
