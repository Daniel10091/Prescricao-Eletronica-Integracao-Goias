import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PacienteRoutingModule } from './paciente-routing.module';

import { PacienteComponent } from './paciente.component';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    
    FormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export class PacienteModule { }
