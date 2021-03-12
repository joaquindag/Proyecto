import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearComentarioPage } from './crear-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: CrearComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearComentarioPageRoutingModule {}
