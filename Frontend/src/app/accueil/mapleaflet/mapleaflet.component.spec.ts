import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapleafletComponent } from './mapleaflet.component';

describe('MapleafletComponent', () => {
  let component: MapleafletComponent;
  let fixture: ComponentFixture<MapleafletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapleafletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapleafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
