import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentSettingComponent } from './apartment-setting.component';

describe('ApartmentSettingComponent', () => {
  let component: ApartmentSettingComponent;
  let fixture: ComponentFixture<ApartmentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
