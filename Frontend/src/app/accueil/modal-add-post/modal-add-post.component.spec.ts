import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPostComponent } from './modal-add-post.component';

describe('ModalAddPostComponent', () => {
  let component: ModalAddPostComponent;
  let fixture: ComponentFixture<ModalAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
