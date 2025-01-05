import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassGameAddComponent } from './compass-game-add.component';

describe('CompassGameAddComponent', () => {
  let component: CompassGameAddComponent;
  let fixture: ComponentFixture<CompassGameAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompassGameAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassGameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
