import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostComponent } from './addpost.component';

describe('AddpostComponent', () => {
  let component: AddpostComponent;
  let fixture: ComponentFixture<AddpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
