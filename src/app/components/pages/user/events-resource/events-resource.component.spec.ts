import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsResourceComponent } from './events-resource.component';

describe('EventsResourceComponent', () => {
  let component: EventsResourceComponent;
  let fixture: ComponentFixture<EventsResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
