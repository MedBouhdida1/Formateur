import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationbyoffreComponent } from './postulationbyoffre.component';

describe('PostulationbyoffreComponent', () => {
  let component: PostulationbyoffreComponent;
  let fixture: ComponentFixture<PostulationbyoffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationbyoffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationbyoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
