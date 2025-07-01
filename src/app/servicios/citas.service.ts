import { Injectable } from '@angular/core';
import { Cita } from '../modelos/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citas: Cita[] = [
    { frase: 'El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.', autor: 'Ralph Waldo Emerson' },
    { frase: 'No hay camino para la paz, la paz es el camino.', autor: 'Mahatma Gandhi' },
    { frase: 'La vida es lo que pasa mientras estás ocupado haciendo otros planes.', autor: 'John Lennon' }
  ];

  // Obtener todas las citas
  obtenerTodas(): Cita[] {
    return [...this.citas]; // Copia para no alterar el original
  }

  // Obtener una cita aleatoria
  obtenerAleatoria(): Cita | null {
    const total = this.citas.length;
    if (total === 0) return null;
    const indice = Math.floor(Math.random() * total);
    return this.citas[indice];
  }

  // Agregar una nueva cita
  agregar(cita: Cita): void {
    this.citas.push(cita);
  }

  // Eliminar por índice
  eliminar(index: number): void {
    if (index >= 0 && index < this.citas.length) {
      this.citas.splice(index, 1);
    }
  }

  // Borrar todas las citas
  limpiar(): void {
    this.citas = [];
  }
}
