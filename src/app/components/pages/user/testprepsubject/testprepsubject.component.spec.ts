import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestprepsubjectComponent } from './testprepsubject.component';

describe('TestprepsubjectComponent', () => {
  let component: TestprepsubjectComponent;
  let fixture: ComponentFixture<TestprepsubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestprepsubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestprepsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
