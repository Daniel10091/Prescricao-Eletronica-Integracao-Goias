import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoiasTestComponent } from './goias-test.component';

const routes: Routes = [
  {
    path: '',
    component: GoiasTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoiasRoutingModule {

  constructor() {
  }

}
