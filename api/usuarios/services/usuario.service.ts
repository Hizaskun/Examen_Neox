import { Service } from 'typedi';
import { PrismaClient } from "@prisma/client";
import { IUsuario } from '../model/usuario';
import { Md5 } from 'ts-md5';
const prisma = new PrismaClient();

@Service()
export class UsuarioService 
{
  constructor() 
  {}

  async getUsuario()
  {    
    return await prisma.usuario.findMany();
  }

  async getUsuarioByCorreo(correo:string)
  {    
    return await prisma.usuario.findUnique(
      {
        where: {correo: correo}
      }
    );
  }

  async addUsuario(usuario:IUsuario)
  {    
    usuario.password = Md5.hashStr(usuario.password);
    const { nombres,apellidos, correo, codigoSecreto, nombreUsuario, password, indicadorBloqueo, nroIntentos } = usuario;
    return await prisma.usuario.create(
      {
        data: 
        {
          nombres,
          apellidos, 
          correo, 
          codigoSecreto, 
          nombreUsuario, 
          password, 
          indicadorBloqueo,
          nroIntentos
        }
      }
    );
  }

  async updUsuario(usuario:IUsuario)
  {    
    const correo = usuario.correo;
    return await prisma.usuario.update(
      {
      where: { correo: correo },
      data: usuario
      }
    );
  }

  async delUsuario(correo:string)
  {    
    return await prisma.usuario.delete(
      {
      where: { correo: correo }
      }
    );
  }

}