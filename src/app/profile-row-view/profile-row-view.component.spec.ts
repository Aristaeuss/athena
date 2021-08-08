import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRowViewComponent } from './profile-row-view.component';

describe('ProfileRowViewComponent', () => {
  let component: ProfileRowViewComponent;
  let fixture: ComponentFixture<ProfileRowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRowViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
