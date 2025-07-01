import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular'; // ✅ Solo importamos AlertController
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CitasService } from '../../servicios/citas.service'; // Servicio de citas
import { Cita } from '../../modelos/cita.model'; // Modelo de cita

@Component({
  selector: 'app-gestion',
  standalone: true, // ✅ Componente Standalone
  imports: [
    CommonModule,
    IonicModule,          // ✅ Ya incluye todos los componentes Ionic como ion-divider, ion-card, etc.
    ReactiveFormsModule   // Para formularios reactivos
  ],
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss']
})
export class GestionPage implements OnInit {
  formulario!: FormGroup; // Formulario reactivo para agregar citas
  citas: Cita[] = [];     // Arreglo local de citas

  constructor(
    private fb: FormBuilder,          // Constructor de formularios
    private citasService: CitasService, // Servicio que maneja las citas
    private alertCtrl: AlertController // Controlador de alertas
  ) {}

  ngOnInit() {
    // Inicializamos el formulario con validaciones
    this.formulario = this.fb.group({
      frase: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.cargarCitas(); // Cargamos las citas desde el servicio
  }

  // Trae todas las citas desde el servicio
  private cargarCitas() {
    this.citas = this.citasService.obtenerCitas();
  }

  // Método que se llama al enviar el formulario
  agregarCita() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched(); // Marca todos los campos como tocados si hay errores
      return;
    }

    const nueva: Cita = {
      id: Date.now(), // ID único usando timestamp
      frase: this.formulario.value.frase,
      autor: this.formulario.value.autor,
    };

    this.citasService.agregarCita(nueva); // Guardamos la cita
    this.formulario.reset();              // Limpiamos el formulario
    this.cargarCitas();                   // Recargamos citas para mostrar la nueva
  }

  // Muestra alerta para confirmar eliminación
  async eliminarCita(id: number) {
    const alerta = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar esta cita?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.citasService.eliminarCita(id); // Eliminamos la cita
            this.cargarCitas();                 // Recargamos la lista
          }
        }
      ]
    });

    await alerta.present(); // Mostramos la alerta
  }

  // Getters para validar formularios en el HTML
  get frase() { return this.formulario.get('frase'); }
  get autor() { return this.formulario.get('autor'); }
}
