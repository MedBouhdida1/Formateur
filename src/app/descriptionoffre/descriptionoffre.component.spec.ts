import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionoffreComponent } from './descriptionoffre.component';

describe('DescriptionoffreComponent', () => {
  let component: DescriptionoffreComponent;
  let fixture: ComponentFixture<DescriptionoffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionoffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
