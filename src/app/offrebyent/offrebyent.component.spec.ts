import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrebyentComponent } from './offrebyent.component';

describe('OffrebyentComponent', () => {
  let component: OffrebyentComponent;
  let fixture: ComponentFixture<OffrebyentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffrebyentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffrebyentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
