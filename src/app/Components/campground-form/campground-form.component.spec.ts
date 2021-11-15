import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundFormComponent } from './campground-form.component';

describe('CampgroundFormComponent', () => {
  let component: CampgroundFormComponent;
  let fixture: ComponentFixture<CampgroundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampgroundFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
