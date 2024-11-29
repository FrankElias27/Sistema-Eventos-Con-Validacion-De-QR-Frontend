export interface Usuario {
  id: number;
  nombre?: string;
  apellidoPaterno?: string,
  apellidoMaterno?: string,
  dni?: string;
  fechaNacimiento?: Date | null;
  email?: string;
  telefono?: string;
  fechaRegistro?: Date;
  username?: string;
  password?: string;
  authorities?: Array<{ authority: string }>;
  avatarUrl?: string;
  fechaCumpleanos?: Date;
}
