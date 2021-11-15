import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyHomePageComponent } from './add-property-home-page.component';

describe('AddPropertyHomePageComponent', () => {
  let component: AddPropertyHomePageComponent;
  let fixture: ComponentFixture<AddPropertyHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropertyHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
