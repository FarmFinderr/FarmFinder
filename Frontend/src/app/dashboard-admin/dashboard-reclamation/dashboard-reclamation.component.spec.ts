import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReclamationComponent } from './dashboard-reclamation.component';

describe('DashboardReclamationComponent', () => {
  let component: DashboardReclamationComponent;
  let fixture: ComponentFixture<DashboardReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReclamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
