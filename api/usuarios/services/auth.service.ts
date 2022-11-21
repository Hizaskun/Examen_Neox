import { Service } from 'typedi';
import { IUsuario } from '../model/usuario';
import { Md5 } from 'ts-md5';
import jwt from 'jsonwebtoken';
import { UsuarioService } from './usuario.service';
const pwdJwt = "pruebaPractica";

@Service()
export class AuthService 
{
  constructor(public _usuarioService: UsuarioService) 
  {}

  async login(usuario:IUsuario)
  {
    usuario.password = Md5.hashStr(usuario.password);
    let usuarioBd:IUsuario = await this._usuarioService.getUsuarioByCorreo(usuario.correo);

    if(usuarioBd.password == usuario.password && !usuarioBd.indicadorBloqueo)
    {
      usuarioBd.nroIntentos = 0;
      this._usuarioService.updUsuario(usuarioBd);

      let payload = { 
        usr:usuario.nombreUsuario,
         email:usuarioBd.correo, 
         exp: Math.floor(Date.now() / 1000) + (60 * 30)
        };
      var token = jwt.sign(payload, pwdJwt);
      return token;
    }
    else if(usuarioBd.password != usuario.password)
    {
        this.modificarReintento(usuarioBd);
        return 1;
    }
    else if(usuarioBd.indicadorBloqueo)
    {
        this.modificarReintento(usuarioBd);
        return 2;
    }
    else
    {
        return 3;
    }
  }

  async modificarReintento(usuarioBd)
  {
    if(usuarioBd.nroIntentos >= 3)
    {
      usuarioBd.indicadorBloqueo = true;
    }
    usuarioBd.nroIntentos = usuarioBd.nroIntentos + 1;
    this._usuarioService.updUsuario(usuarioBd);
  }

  async crearCodigo(correo:string)
  {
    let usuarioBd:IUsuario = await this._usuarioService.getUsuarioByCorreo(correo);
    if(!usuarioBd.indicadorBloqueo)
    { 
      let codigo = Math.floor(Math.random() * 999999);
      console.log("codigo secreto: ",codigo.toString());
      usuarioBd.codigoSecreto = Md5.hashStr(codigo.toString());
      this._usuarioService.updUsuario(usuarioBd);
      return true;
    }
    else
      return false;
  }

  async cambiarPassword(usuario:IUsuario)
  {
    usuario.codigoSecreto = Md5.hashStr(usuario.codigoSecreto);
    let usuarioBd:IUsuario = await this._usuarioService.getUsuarioByCorreo(usuario.correo);
    if(usuarioBd.codigoSecreto == usuario.codigoSecreto && !usuarioBd.indicadorBloqueo)
    { 
      usuario.nombreUsuario = usuarioBd.nombreUsuario;
      usuario.password = Md5.hashStr(usuario.password);
      this._usuarioService.updUsuario(usuario);
      return true;
    }
    else 
      return false;
  }

}