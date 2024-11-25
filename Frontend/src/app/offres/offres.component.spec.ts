import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresComponent } from './offres.component';


describe('OffresComponent', () => {
  let component: OffresComponent;
  let fixture: ComponentFixture<OffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
