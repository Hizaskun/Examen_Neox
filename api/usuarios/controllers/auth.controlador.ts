import { JsonController, Post, Body, Put} from "routing-controllers";
import { Service } from 'typedi';
import { URL_INFO } from '../api-info';
import { IUsuario } from "../model/usuario";
import { AuthService } from "../services/auth.service";
import { UsuarioService } from "../services/usuario.service";

@JsonController(URL_INFO.contextPath + '/auth')
@Service()
export class UserInfoController 
{
  constructor(public _usuarioService: UsuarioService, public _authService: AuthService) { }

  @Post('/login')
  public async login(@Body() req:IUsuario): Promise<any> 
  {
    try 
    {
        let resp:any = await this._authService.login(req);
        if(resp == 1)
            return Promise.resolve({mensaje: "Contraseña Incorrecta"});
        else if(resp == 2)
            return Promise.resolve({mensaje: "Usuario Bloqueado"});
        else if(resp == 3)
            return Promise.resolve({mensaje: "Usuario no existe"});
        else
            return Promise.resolve({token: resp});
    } 
    catch (error) 
    {
      return Promise.reject(error);
    }
  }

  @Put('/cambiarPassword')
  public async cambiarPassword(@Body() req:IUsuario): Promise<any> 
  {
    try 
    {
      let resp:any = await this._authService.cambiarPassword(req);
      return Promise.resolve(resp);
    } 
    catch (error) 
    {
    console.log('Controller2: getUserInfo', 'errorInfo:' + JSON.stringify(error));
      return Promise.reject(error);
    }
  }

  @Post('/enviarCodigo')
  public async crearCodigo(@Body() req:IUsuario): Promise<any> 
  {
    try 
    {
      let resp:any = await this._authService.crearCodigo(req.correo);
      return Promise.resolve(resp);
    } 
    catch (error) 
    {
    console.log('Controller2: getUserInfo', 'errorInfo:' + JSON.stringify(error));
      return Promise.reject(error);
    }
  }

}