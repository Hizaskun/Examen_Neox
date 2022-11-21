import { JsonController, Get , Post, Body, Put, Delete, Param, HeaderParams} from "routing-controllers";
import { Service } from 'typedi';
import { URL_INFO } from '../api-info';
import { IUsuario } from "../model/usuario";
import { UsuarioService } from "../services/usuario.service";
import jwt from 'jsonwebtoken';
const pwdJwt = "pruebaPractica";

@JsonController(URL_INFO.contextPath + '/userInfo')
@Service()
export class UserInfoController {
  constructor(public _usuarioService: UsuarioService) { }

  @Get('/')
  public async getUserInfo( @HeaderParams() headers): Promise<any> {
    try 
    {
      if(this.validaToken(headers.authorization))
      {
        let resp:any = await this._usuarioService.getUsuario();
        return Promise.resolve(resp);
      }
      else
        return Promise.resolve({mensaje: "Token Inválido"});

    } catch (error) 
    {      
      return Promise.reject({mensaje: "Error al obtener los datos"});
    }
  }

  @Post('/agregar')
  public async agregar(@Body() req:IUsuario, @HeaderParams() headers): Promise<any> {
    try 
    {
      if(this.validaToken(headers.authorization))
      {
        let resp:any = await this._usuarioService.addUsuario(req);
        return Promise.resolve(resp);
      }
      else
        return Promise.resolve({mensaje: "Token Inválido"});

    } catch (error) 
    {
      return Promise.reject({mensaje: "Error al agregar los datos"});
    }
  }

  @Put('/modificar')
  public async modificar(@Body() req:IUsuario,  @HeaderParams() headers): Promise<any> {
    try 
    {
      if(this.validaToken(headers.authorization))
      {
        let resp:any = await this._usuarioService.updUsuario(req);
        return Promise.resolve(resp);
      }
      else
        return Promise.resolve({mensaje: "Token Inválido"});

    } catch (error) 
    {
      return Promise.reject({mensaje: "Error al modificar los datos"});
    }
  }

  @Delete('/eliminar/:nombreusuario')
  public async eliminar(@Param('nombreusuario') nombreusuario:string,  @HeaderParams() headers): Promise<any> {
    try 
    {
      if(this.validaToken(headers.authorization))
      {
        let resp:any = await this._usuarioService.delUsuario(nombreusuario);
        return Promise.resolve(resp);
      }
      else
        return Promise.resolve({mensaje: "Token Inválido"});

    } catch (error) 
    {
      return Promise.reject({mensaje: "Error al eliminar los datos"});
    }
  }

  public validaToken(token)
  {
    try 
    {
      jwt.verify(token, pwdJwt);
      return true;
    } 
    catch (error) 
    {
      return false;
    }
  }

}