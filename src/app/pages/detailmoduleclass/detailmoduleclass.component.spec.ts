import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmoduleclassComponent } from './detailmoduleclass.component';

describe('DetailmoduleclassComponent', () => {
  let component: DetailmoduleclassComponent;
  let fixture: ComponentFixture<DetailmoduleclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailmoduleclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmoduleclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
