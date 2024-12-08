import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdetailsComponent } from './eventdetails.component';

describe('EventdetailsComponent', () => {
  let component: EventdetailsComponent;
  let fixture: ComponentFixture<EventdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
