import { Usuario } from './usuario.model';

export interface Invitado {
  nombre: string;
  dni: string;
  createdDate: Date;
  año: number;
  usuario: Usuario;
}
