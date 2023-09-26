import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSlideComponent } from './quiz-slide.component';

describe('QuizSlideComponent', () => {
  let component: QuizSlideComponent;
  let fixture: ComponentFixture<QuizSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
