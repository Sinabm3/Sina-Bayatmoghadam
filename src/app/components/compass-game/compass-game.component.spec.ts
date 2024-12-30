import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassGameComponent } from './compass-game.component';

describe('CompassGameComponent', () => {
  let component: CompassGameComponent;
  let fixture: ComponentFixture<CompassGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompassGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
