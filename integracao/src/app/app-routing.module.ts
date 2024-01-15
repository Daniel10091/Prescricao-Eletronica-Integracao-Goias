import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule),
  },
  {
    path: 'prescricao',
    loadChildren: () => import('./pages/prescricao/prescricao.module').then(m => m.PrescricaoModule),
  },
  {
    path: 'paciente',
    loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }

}
