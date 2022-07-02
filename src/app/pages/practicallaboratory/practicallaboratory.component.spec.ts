import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticallaboratoryComponent } from './practicallaboratory.component';

describe('PracticallaboratoryComponent', () => {
  let component: PracticallaboratoryComponent;
  let fixture: ComponentFixture<PracticallaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticallaboratoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticallaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
