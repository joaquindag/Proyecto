import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BbddService } from '../share/bbdd.service';
import { MyFormGroup } from '../validators/myformgroup';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  algo;
  public controlForm:MyFormGroup;
  public nombreControles;
  public bandera=false;
  public verOk=0;
  public incorrecto=false;
  constructor(public registroService: RegistroService, private bbdd:BbddService, private route:Router) {
    this.controlForm = registroService.gerFormGroup();
    this.nombreControles=registroService.nombreControles;
    // console.log(this.controlForm);
    // console.log(this.nombreControles);
  }

  pageNavigator(nombre: String) {
    this.route.navigate([nombre]);
  }


  getVerifyNickCorreo() {

    let nick = this.registroService.sayTheField("nick");
    let correo = this.registroService.sayTheField("correo")
    this.bbdd.getVerifyNickCorreo(nick, correo).then((data) => {
      console.log(data);
      if(data[0].registry===0){
        this.bandera = true;
        this.incorrecto=false;
      } else{
        this.incorrecto=true;
      }
    }).catch((e) => { alert(e) });
    this.verOk = this.bbdd.getverCorreoNick();
    
  }

  crearUser() {

    let nombre=this.registroService.sayTheField("nombre")
    let apellido=this.registroService.sayTheField("apellidos")
    let nick = this.registroService.sayTheField("nick");
    let correo = this.registroService.sayTheField("correo");
    let telefono=this.registroService.sayTheField("telefono")
    let pass=this.registroService.sayTheField("contrasena")


    this.bbdd.crearRegistro(nombre,apellido,correo,nick, telefono, pass).then().catch((e) => { alert(e) });
    //this.verOk = this.bbdd.getverCorreoNick();
    
  }
}
