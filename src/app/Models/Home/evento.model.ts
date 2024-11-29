import { Visibilidad } from '../enums/visibilidad.enum';
import { Registro } from '../enums/registro.enum';

export interface Evento {
    eventoId: number;
    nombre: string;
    imagen?: Blob;
    fechaEvento: string;
    fechaInicio: string;
    fechaFin: string;
    visibilidad: Visibilidad;
    cantidadQR: number;
    activo: boolean;
    estadoRegistro?: Registro;
}
