import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'novo',
  },
  {
    path: 'novo',
    component: PacienteComponent
  },
  {
    path: 'editar/:id',
    component: PacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
