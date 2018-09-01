import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdoorsPageComponent } from './outdoors-page.component';

describe('OutdoorsPageComponent', () => {
  let component: OutdoorsPageComponent;
  let fixture: ComponentFixture<OutdoorsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutdoorsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdoorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
