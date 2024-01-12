import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiasTestComponent } from './goias-test.component';

describe('GoiasTestComponent', () => {
  let component: GoiasTestComponent;
  let fixture: ComponentFixture<GoiasTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoiasTestComponent]
    });
    fixture = TestBed.createComponent(GoiasTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
