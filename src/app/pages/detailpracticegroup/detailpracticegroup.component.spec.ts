import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpracticegroupComponent } from './detailpracticegroup.component';

describe('DetailpracticegroupComponent', () => {
  let component: DetailpracticegroupComponent;
  let fixture: ComponentFixture<DetailpracticegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailpracticegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpracticegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
