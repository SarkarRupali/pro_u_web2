import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperimetComponent } from './work-experimet.component';

describe('WorkExperimetComponent', () => {
  let component: WorkExperimetComponent;
  let fixture: ComponentFixture<WorkExperimetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExperimetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperimetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
