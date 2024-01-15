import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalAtendimentoComponent } from './local-atendimento.component';
import { LocalAtendimentoRoutingModule } from './local-atendimento-routing.module';

@NgModule({
  declarations: [
    LocalAtendimentoComponent
  ],
  imports: [
    CommonModule,
    LocalAtendimentoRoutingModule
  ]
})
export class LocalAtendimentoModule { }
