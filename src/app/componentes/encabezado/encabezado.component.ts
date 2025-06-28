import { Component, EventEmitter, Output } from '@angular/core';
// Importa IonicModule para poder usar <ion-header>, <ion-toolbar>, etc.
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [IonicModule],   // ← Asegúrate de importar IonicModule
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
