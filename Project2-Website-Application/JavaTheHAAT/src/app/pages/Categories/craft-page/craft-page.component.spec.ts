import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftPageComponent } from './craft-page.component';

describe('CraftPageComponent', () => {
  let component: CraftPageComponent;
  let fixture: ComponentFixture<CraftPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
