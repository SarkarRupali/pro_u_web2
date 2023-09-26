import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtracurriculamComponent } from './extracurriculam.component';

describe('ExtracurriculamComponent', () => {
  let component: ExtracurriculamComponent;
  let fixture: ComponentFixture<ExtracurriculamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtracurriculamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtracurriculamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
