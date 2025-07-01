import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { CitasService } from '../../servicios/citas.service';
import { ConfiguracionService } from '../../servicios/configuracion.service';
import { EncabezadoComponent } from '../../componentes/encabezado/encabezado.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, IonicModule, EncabezadoComponent],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage {
  cita: any = null;
  citas: any[] = [];

  constructor(
    private citasService: CitasService,
    private configService: ConfiguracionService
  ) {}

  async ionViewWillEnter() {
    const config = await this.configService.cargar();
    if (config.borrarAlInicio) {
      this.citasService.limpiar();
    }

    this.cita = this.citasService.obtenerAleatoria();
    this.citas = this.citasService.obtenerTodas().filter(c => c !== this.cita);
  }

  onRefrescar() {
    this.ionViewWillEnter(); // Recarga
  }

  onConfig() {
    window.location.href = '/configuracion';
  }
}
