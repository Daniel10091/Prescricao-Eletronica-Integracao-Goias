import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'goias',
    pathMatch: 'full'
  },
  {
    path: 'prescricao',
    loadChildren: () => import('./pages/prescricao/prescricao.module').then(m => m.PrescricaoModule),
  },
  {
    path: 'goias',
    loadChildren: () => import('./pages/goias-test/goias-test.module').then(m => m.GoiasTestModule),
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
