import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescricaoRoutingModule } from './prescricao-routing.module';
import { PrescricaoComponent } from './prescricao.component';

@NgModule({
  declarations: [
    PrescricaoComponent
  ],
  imports: [
    CommonModule,
    PrescricaoRoutingModule
  ]
})
export class PrescricaoModule { }
