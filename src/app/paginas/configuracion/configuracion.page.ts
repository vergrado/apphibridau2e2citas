// src/app/paginas/configuracion/configuracion.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ConfiguracionService, Configuracion } from '../../servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss']
})
export class ConfiguracionPage {
  borrarAlInicio = false;

  constructor(private cfgService: ConfiguracionService) {}

  async ionViewWillEnter() {
    const cfg = await this.cfgService.cargar();
    this.borrarAlInicio = cfg.borrarAlInicio;
  }

  async onToggle(event: CustomEvent) {
    this.borrarAlInicio = event.detail.checked;
    await this.cfgService.guardar({ borrarAlInicio: this.borrarAlInicio });
  }
}
