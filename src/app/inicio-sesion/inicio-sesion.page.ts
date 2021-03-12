import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { BbddService } from '../share/bbdd.service';
import { MyFormGroup } from '../validators/myformgroup';
import { InicioSesionService } from './inicio-sesion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  algo;
  public controlForm: MyFormGroup;
  public nombreControles;
  public verOk = 0;
  public bandera = false;
  public incorrecto=false;
  constructor(public inicioSesionService: InicioSesionService,
    private route: Router,
    private rutaActiva: ActivatedRoute,
    private bbdd: BbddService,
    private datos:DatosService) {

    this.controlForm = inicioSesionService.gerFormGroup();
    this.nombreControles = inicioSesionService.nombreControles;
  }

  pageNavigator(nombre: String) {
    let extraNavegacion: NavigationExtras = {
      state: {
        name: this.inicioSesionService.sayTheField("nick")
      }
    }
    this.route.navigate([nombre], extraNavegacion);
  }

  getLogin() {


    let nick = this.inicioSesionService.sayTheField("nick");
    let pass = this.inicioSesionService.sayTheField("contrasena")

    this.bbdd.getLogin(nick, pass).then((data) => {
      console.log(data);
      if(data[0].logeo===1){
        this.bandera = true;
        this.incorrecto=false;
      } else{
        this.incorrecto=true;
      }
    }).catch((e) => { alert(e) });
    this.verOk = this.bbdd.getverLogin();
    
  }

  guardarNick(){
    this.datos.setNick(this.inicioSesionService.sayTheField("nick"))
  }
}
