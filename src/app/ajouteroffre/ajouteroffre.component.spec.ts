import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteroffreComponent } from './ajouteroffre.component';

describe('AjouteroffreComponent', () => {
  let component: AjouteroffreComponent;
  let fixture: ComponentFixture<AjouteroffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteroffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteroffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
