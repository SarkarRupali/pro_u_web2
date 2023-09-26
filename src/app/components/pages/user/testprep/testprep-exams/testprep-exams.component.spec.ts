import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestprepExamsComponent } from './testprep-exams.component';

describe('TestprepExamsComponent', () => {
  let component: TestprepExamsComponent;
  let fixture: ComponentFixture<TestprepExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestprepExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestprepExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
