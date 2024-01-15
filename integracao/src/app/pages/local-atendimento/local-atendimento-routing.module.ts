import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalAtendimentoComponent } from './local-atendimento.component';

const routes: Routes = [
  {
    path: '',
    component: LocalAtendimentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalAtendimentoRoutingModule {

  constructor() {
  }

}
