import { Usuario } from './usuario.model';

export interface Birthday {
  descripcion: string;
  createdDate: Date;
  usuario: Usuario;
}
