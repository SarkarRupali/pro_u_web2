import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPrepdetailsComponent } from './test-prepdetails.component';

describe('TestPrepdetailsComponent', () => {
  let component: TestPrepdetailsComponent;
  let fixture: ComponentFixture<TestPrepdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPrepdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPrepdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
