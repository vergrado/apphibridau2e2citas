import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// Interfaz que define la configuración
export interface Configuracion {
  borrarAlInicio: boolean;
}

// Clave bajo la que guardamos el valor
const CLAVE_BORRAR = 'borrarAlInicio';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {

  /** Guarda la opción en storage nativo */
  async guardar(config: Configuracion): Promise<void> {
    await Preferences.set({
      key: CLAVE_BORRAR,
      value: JSON.stringify(config.borrarAlInicio)
    });
  }

  /** Carga la opción desde storage, devuelve false si no existe */
  async cargar(): Promise<Configuracion> {
    const { value } = await Preferences.get({ key: CLAVE_BORRAR });
    return {
      borrarAlInicio: value === null
        ? false
        : JSON.parse(value)
    };
  }
}
