// src/app/paginas/gestion/gestion.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CitasService } from '../../servicios/citas.service';
import { Cita } from '../../modelos/cita.model';



@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss']
})
export class GestionPage implements OnInit {
  formulario!: FormGroup;
  citas: Cita[] = [];

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      frase: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.cargarCitas();
  }

  private cargarCitas() {
    this.citas = this.citasService.obtenerCitas();
  }

  agregarCita() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const nueva: Cita = {
      id: Date.now(),
      frase: this.formulario.value.frase,
      autor: this.formulario.value.autor,
    };
    this.citasService.agregarCita(nueva);
    this.formulario.reset();
    this.cargarCitas();
  }

  async eliminarCita(id: number) {
    const alerta = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar esta cita?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.citasService.eliminarCita(id);
            this.cargarCitas();
          }
        }
      ]
    });
    await alerta.present();
  }

  get frase() { return this.formulario.get('frase'); }
  get autor() { return this.formulario.get('autor'); }
}
