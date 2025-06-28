// src/app/paginas/inicio/inicio.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

import { CitasService } from '../../servicios/citas.service';
import { ConfiguracionService } from '../../servicios/configuracion.service';
import { Cita } from '../../modelos/cita.model';
import { EncabezadoComponent } from '../../componentes/encabezado/encabezado.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    EncabezadoComponent
  ],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {
  cita?: Cita;
  borrarAlInicio = false;

  constructor(
    private citasService: CitasService,
    private cfgService: ConfiguracionService,
    private router: Router
  ) {}

  async ngOnInit() {
    const cfg = await this.cfgService.cargar();
    this.borrarAlInicio = cfg.borrarAlInicio;
    if (!this.borrarAlInicio) {
      this.cita = this.citasService.obtenerCitaAleatoria();
    }
  }

  onRefrescar() {
    this.ngOnInit();
  }

  onConfig() {
    this.router.navigate(['/configuracion']);
  }
}
