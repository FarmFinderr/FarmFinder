import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenmapComponent } from './openmap.component';

describe('OpenmapComponent', () => {
  let component: OpenmapComponent;
  let fixture: ComponentFixture<OpenmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
