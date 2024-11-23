import { ComponentFixture, TestBed } from '@angular/core/testing';


import { TableDashboard} from './table-dashboard.component';

describe('TableDashboardComponent', () => {
  let component: TableDashboard;
  let fixture: ComponentFixture<TableDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
