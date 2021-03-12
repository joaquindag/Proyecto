import { MyFormGroup } from './../validators/myformgroup';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyFormControl } from '../validators/myFormControl';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  gerFormGroup(): any {
   return this.myFormGroup.formGroup;
  }
  private _myFormGroup: MyFormGroup;
  private nombreCampos=["nombre","apellidos","correo","nick","telefono","contrasena"];
  public nombreControles = ['nombre', 'apellidos', 'correo', 'nick', 'telefono', 'contrasena'];
  private controles = [
    new MyFormControl('',Validators.compose([Validators.required, Validators.minLength(3)])),
    new MyFormControl('',Validators.compose([Validators.required, Validators.minLength(3)])),
    new MyFormControl('', Validators.compose([Validators.required,Validators.pattern('^\\w*@\\w*((.es|.com|.org)|(\\d))$')])),
    new MyFormControl('', Validators.compose([Validators.required,Validators.pattern('[\\d\\w@ñ\\.]*')])),
    new MyFormControl('', Validators.compose([Validators.required,Validators.pattern('\\d{9}')])),
    new MyFormControl('', Validators.compose([Validators.required,Validators.pattern('(?=\\w*\\d)(?=\\w*[a-z])(?=\\w*[A-Z])\\S{6}')])),
  ];

  constructor() {
    this._myFormGroup = new MyFormGroup(this.nombreCampos,this.nombreControles,this.controles);
    this.myFormGroup.insertarValidationMessages('nombre',['minlength'],['Minimo 3 letras']);
    this.myFormGroup.insertarValidationMessages('apellidos',['minlength'],['Minimo 3 letras']);
    this.myFormGroup.insertarValidationMessages('correo',['pattern'],['Correo no valido']);
    this.myFormGroup.insertarValidationMessages('nick',['pattern'],['Nick no valido']);
    this.myFormGroup.insertarValidationMessages('telefono',['pattern'],['Solo se aceptan numeros o no tiene los necesarios']);
    this.myFormGroup.insertarValidationMessages('contrasena',['pattern'],['contraseña de al menos 6 caracteres con al menos un numero una mayuscula y minusculas']);
  }

  /**
   * Getter myFormGroup
   * @return {MyFormGroup}
   */
  public get myFormGroup(): MyFormGroup {
    return this._myFormGroup;
  }

  validateControl(element): boolean {
    return (
      this.myFormGroup.getControl(element).dirty &&
      !this.myFormGroup.getControl(element).valid)
  }

  getErrorMessage(control) {
    let algo=this.myFormGroup.getControl(control)
    //console.log("sucio "+algo.dirty);    
    let errores= algo.errors;
    return algo.getValidationMessage(Object.keys(errores)[0]);
  }

  validateAllControl():boolean{
    let bandera=true;
    for (let index = 0; index < this.nombreControles.length; index++) {
      if(!this.myFormGroup.getControl(this.nombreCampos[index]).valid){
        bandera=false;
      }
    }
    return bandera;
  }

  sayTheField(campo){
    let cadena=this.myFormGroup.getControl(campo).value;
    return cadena;
  }
}
