import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassGameEditComponent } from './compass-game-edit.component';

describe('CompassGameEditComponent', () => {
  let component: CompassGameEditComponent;
  let fixture: ComponentFixture<CompassGameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompassGameEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassGameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
