import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandihomeComponent } from './randihome.component';

describe('RandihomeComponent', () => {
  let component: RandihomeComponent;
  let fixture: ComponentFixture<RandihomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandihomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandihomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
