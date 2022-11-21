  export interface IUsuario 
  {
    nombres?: string;
    apellidos?: string;
    nombreUsuario?: string;
    correo?: string;
    codigoSecreto?: string;
    indicadorBloqueo?: boolean;
    password?:string;
    nroIntentos?:number;

  }