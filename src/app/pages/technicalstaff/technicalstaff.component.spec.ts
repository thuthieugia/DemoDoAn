import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalstaffComponent } from './technicalstaff.component';

describe('TechnicalstaffComponent', () => {
  let component: TechnicalstaffComponent;
  let fixture: ComponentFixture<TechnicalstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
