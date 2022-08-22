import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VosoffresComponent } from './vosoffres.component';

describe('VosoffresComponent', () => {
  let component: VosoffresComponent;
  let fixture: ComponentFixture<VosoffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VosoffresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VosoffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
