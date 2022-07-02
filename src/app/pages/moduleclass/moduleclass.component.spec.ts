import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleclassComponent } from './moduleclass.component';

describe('ModuleclassComponent', () => {
  let component: ModuleclassComponent;
  let fixture: ComponentFixture<ModuleclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
