"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ts_md5_1 = require("ts-md5");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const usuario_service_1 = require("./usuario.service");
const pwdJwt = "pruebaPractica";
let AuthService = class AuthService {
    constructor(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    login(usuario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            usuario.password = ts_md5_1.Md5.hashStr(usuario.password);
            let usuarioBd = yield this._usuarioService.getUsuarioByCorreo(usuario.correo);
            if (usuarioBd.password == usuario.password && !usuarioBd.indicadorBloqueo) {
                usuarioBd.nroIntentos = 0;
                this._usuarioService.updUsuario(usuarioBd);
                let payload = {
                    usr: usuario.nombreUsuario,
                    email: usuarioBd.correo,
                    exp: Math.floor(Date.now() / 1000) + (60 * 30)
                };
                var token = jsonwebtoken_1.default.sign(payload, pwdJwt);
                return token;
            }
            else if (usuarioBd.password != usuario.password) {
                this.modificarReintento(usuarioBd);
                return 1;
            }
            else if (usuarioBd.indicadorBloqueo) {
                this.modificarReintento(usuarioBd);
                return 2;
            }
            else {
                return 3;
            }
        });
    }
    modificarReintento(usuarioBd) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (usuarioBd.nroIntentos >= 3) {
                usuarioBd.indicadorBloqueo = true;
            }
            usuarioBd.nroIntentos = usuarioBd.nroIntentos + 1;
            this._usuarioService.updUsuario(usuarioBd);
        });
    }
    crearCodigo(correo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let usuarioBd = yield this._usuarioService.getUsuarioByCorreo(correo);
            if (!usuarioBd.indicadorBloqueo) {
                let codigo = Math.floor(Math.random() * 999999);
                console.log("codigo secreto: ", codigo.toString());
                usuarioBd.codigoSecreto = ts_md5_1.Md5.hashStr(codigo.toString());
                this._usuarioService.updUsuario(usuarioBd);
                return true;
            }
            else
                return false;
        });
    }
    cambiarPassword(usuario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            usuario.codigoSecreto = ts_md5_1.Md5.hashStr(usuario.codigoSecreto);
            let usuarioBd = yield this._usuarioService.getUsuarioByCorreo(usuario.correo);
            if (usuarioBd.codigoSecreto == usuario.codigoSecreto && !usuarioBd.indicadorBloqueo) {
                usuario.nombreUsuario = usuarioBd.nombreUsuario;
                usuario.password = ts_md5_1.Md5.hashStr(usuario.password);
                this._usuarioService.updUsuario(usuario);
                return true;
            }
            else
                return false;
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map