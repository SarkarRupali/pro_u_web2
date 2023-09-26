import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpreppaperComponent } from './testpreppaper.component';

describe('TestpreppaperComponent', () => {
  let component: TestpreppaperComponent;
  let fixture: ComponentFixture<TestpreppaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestpreppaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpreppaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
