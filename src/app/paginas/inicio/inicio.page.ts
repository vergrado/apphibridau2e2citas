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
  imports: [CommonModule, IonicModule, RouterModule, EncabezadoComponent],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {
  cita?: Cita;
  citas: Cita[] = [];            // <-- agregamos este array
  borrarAlInicio = false;

  constructor(
    private citasService: CitasService,
    private cfgService: ConfiguracionService,
    private router: Router
  ) {}

  async ngOnInit() {
    // 1) Cargamos la configuración
    const cfg = await this.cfgService.cargar();
    this.borrarAlInicio = cfg.borrarAlInicio;

    // 2) Obtenemos el listado completo
    this.citas = this.citasService.obtenerCitas();
    console.log('Listado completo de citas:', this.citas);

    // 3) Si no borramos, pedimos una cita aleatoria
    if (!this.borrarAlInicio && this.citas.length) {
      this.cita = this.citasService.obtenerCitaAleatoria();
    } else {
      this.cita = undefined;
    }
  }

  onRefrescar() {
    this.ngOnInit();
  }

  onConfig() {
    this.router.navigate(['/configuracion']);
  }
}
