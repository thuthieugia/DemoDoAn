import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividepracticegroupsComponent } from './dividepracticegroups.component';

describe('DividepracticegroupsComponent', () => {
  let component: DividepracticegroupsComponent;
  let fixture: ComponentFixture<DividepracticegroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividepracticegroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividepracticegroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
