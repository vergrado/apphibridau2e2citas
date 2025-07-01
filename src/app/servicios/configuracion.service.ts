import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Configuracion {
  borrarAlInicio: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  private readonly clave = 'configuracion';

  async guardar(config: Configuracion) {
    await Preferences.set({
      key: this.clave,
      value: JSON.stringify(config),
    });
  }

  async cargar(): Promise<Configuracion> {
    const { value } = await Preferences.get({ key: this.clave });
    return value ? JSON.parse(value) : { borrarAlInicio: false };
  }
}
