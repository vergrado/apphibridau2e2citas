import { Injectable } from '@angular/core';
import { Cita } from '../modelos/cita.model';

@Injectable({ providedIn: 'root' })  // hace al servicio singleton y disponible en toda la app
export class CitasService {
  // arreglo interno donde guardamos las citas en memoria
  private citas: Cita[] = [
    { id: 1, frase: 'El éxito consiste en obtener lo que se desea...', autor: 'Ralph Waldo Emerson' }
  ];

  /** Devuelve una copia del arreglo de citas */
  obtenerCitas(): Cita[] {
    return [...this.citas];
  }

  /** Agrega una nueva cita al arreglo */
  agregarCita(cita: Cita) {
    this.citas.push(cita);
  }

  /** Elimina la cita cuyo id coincida */
  eliminarCita(id: number) {
    this.citas = this.citas.filter(c => c.id !== id);
  }

  /** Devuelve una cita aleatoria */
  obtenerCitaAleatoria(): Cita {
    const i = Math.floor(Math.random() * this.citas.length);
    return this.citas[i];
  }
}
