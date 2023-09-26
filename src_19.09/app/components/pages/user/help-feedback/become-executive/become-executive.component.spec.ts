import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeExecutiveComponent } from './become-executive.component';

describe('BecomeExecutiveComponent', () => {
  let component: BecomeExecutiveComponent;
  let fixture: ComponentFixture<BecomeExecutiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeExecutiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeExecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
