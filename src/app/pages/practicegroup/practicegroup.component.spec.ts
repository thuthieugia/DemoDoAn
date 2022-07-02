import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticegroupComponent } from './practicegroup.component';

describe('PracticegroupComponent', () => {
  let component: PracticegroupComponent;
  let fixture: ComponentFixture<PracticegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
