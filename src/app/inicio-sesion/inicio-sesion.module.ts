import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';
import { InicioSesionPage } from './inicio-sesion.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InicioSesionPageRoutingModule
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
