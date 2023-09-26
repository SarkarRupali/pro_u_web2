import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourseListComponent } from './resourse-list.component';

describe('ResourseListComponent', () => {
  let component: ResourseListComponent;
  let fixture: ComponentFixture<ResourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
