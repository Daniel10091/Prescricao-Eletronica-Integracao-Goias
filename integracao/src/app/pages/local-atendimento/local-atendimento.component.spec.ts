import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAtendimentoComponent } from './local-atendimento.component';

describe('LocalAtendimentoComponent', () => {
  let component: LocalAtendimentoComponent;
  let fixture: ComponentFixture<LocalAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalAtendimentoComponent]
    });
    fixture = TestBed.createComponent(LocalAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
