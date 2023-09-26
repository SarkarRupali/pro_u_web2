import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscourseComponent } from './detailscourse.component';

describe('DetailscourseComponent', () => {
  let component: DetailscourseComponent;
  let fixture: ComponentFixture<DetailscourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailscourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
