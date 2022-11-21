"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const api_info_1 = require("../api-info");
const auth_service_1 = require("../services/auth.service");
const usuario_service_1 = require("../services/usuario.service");
let UserInfoController = class UserInfoController {
    constructor(_usuarioService, _authService) {
        this._usuarioService = _usuarioService;
        this._authService = _authService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield this._authService.login(req);
                if (resp == 1)
                    return Promise.resolve({ mensaje: "Contraseña Incorrecta" });
                else if (resp == 2)
                    return Promise.resolve({ mensaje: "Usuario Bloqueado" });
                else if (resp == 3)
                    return Promise.resolve({ mensaje: "Usuario no existe" });
                else
                    return Promise.resolve({ token: resp });
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    cambiarPassword(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield this._authService.cambiarPassword(req);
                return Promise.resolve(resp);
            }
            catch (error) {
                console.log('Controller2: getUserInfo', 'errorInfo:' + JSON.stringify(error));
                return Promise.reject(error);
            }
        });
    }
    crearCodigo(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield this._authService.crearCodigo(req.correo);
                return Promise.resolve(resp);
            }
            catch (error) {
                console.log('Controller2: getUserInfo', 'errorInfo:' + JSON.stringify(error));
                return Promise.reject(error);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/login'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "login", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/cambiarPassword'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "cambiarPassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/enviarCodigo'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "crearCodigo", null);
UserInfoController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)(api_info_1.URL_INFO.contextPath + '/auth'),
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [usuario_service_1.UsuarioService, auth_service_1.AuthService])
], UserInfoController);
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=auth.controlador.js.map