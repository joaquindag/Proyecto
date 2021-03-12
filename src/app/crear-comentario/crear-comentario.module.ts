import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearComentarioPageRoutingModule } from './crear-comentario-routing.module';

import { CrearComentarioPage } from './crear-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearComentarioPageRoutingModule
  ],
  declarations: [CrearComentarioPage]
})
export class CrearComentarioPageModule {}
