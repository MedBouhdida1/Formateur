import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterformateurComponent } from './registerformateur.component';

describe('RegisterformateurComponent', () => {
  let component: RegisterformateurComponent;
  let fixture: ComponentFixture<RegisterformateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterformateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
