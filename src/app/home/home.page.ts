import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BbddService } from '../share/bbdd.service';
import { BbddcopyService } from '../share/bbddcopy.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: Router, private bbddcopy: BbddcopyService, private bbdd:BbddService) {
    this.bbddcopy.copiarBBDD().then(() => {
      this.bbdd.crearBBDD().then().catch();
    }).catch(() => {
      this.bbdd.crearBBDD().then().catch();
    });
  }

  pageNavigator(nombre: String) {
    this.route.navigate([nombre]);
  }
}
