import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourseDetailsComponent } from './resourse-details.component';

describe('ResourseDetailsComponent', () => {
  let component: ResourseDetailsComponent;
  let fixture: ComponentFixture<ResourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
