import { Component, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent {
  @Output() irAInicio = new EventEmitter<void>();
  @Output() irAConfiguracion = new EventEmitter<void>();

  navegarAInicio() {
    this.irAInicio.emit();
  }

  navegarAConfiguracion() {
    this.irAConfiguracion.emit();
  }
}
