import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedCourseComponent } from './recomended-course.component';

describe('RecomendedCourseComponent', () => {
  let component: RecomendedCourseComponent;
  let fixture: ComponentFixture<RecomendedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendedCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
