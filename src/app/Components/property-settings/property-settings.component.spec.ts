import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySettingsComponent } from './property-settings.component';

describe('PropertySettingsComponent', () => {
  let component: PropertySettingsComponent;
  let fixture: ComponentFixture<PropertySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
