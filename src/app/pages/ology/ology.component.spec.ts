import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlogyComponent } from './ology.component';

describe('OlogyComponent', () => {
  let component: OlogyComponent;
  let fixture: ComponentFixture<OlogyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlogyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
