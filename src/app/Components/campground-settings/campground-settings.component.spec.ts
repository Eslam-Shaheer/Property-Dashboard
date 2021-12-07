import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundSettingsComponent } from './campground-settings.component';

describe('CampgroundSettingsComponent', () => {
  let component: CampgroundSettingsComponent;
  let fixture: ComponentFixture<CampgroundSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampgroundSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
