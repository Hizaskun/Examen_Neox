"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const api_info_1 = require("../api-info");
const usuario_service_1 = require("../services/usuario.service");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const pwdJwt = "pruebaPractica";
let UserInfoController = class UserInfoController {
    constructor(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    getUserInfo(headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validaToken(headers.authorization)) {
                    let resp = yield this._usuarioService.getUsuario();
                    return Promise.resolve(resp);
                }
                else
                    return Promise.resolve({ mensaje: "Token Inválido" });
            }
            catch (error) {
                return Promise.reject({ mensaje: "Error al obtener los datos" });
            }
        });
    }
    agregar(req, headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validaToken(headers.authorization)) {
                    let resp = yield this._usuarioService.addUsuario(req);
                    return Promise.resolve(resp);
                }
                else
                    return Promise.resolve({ mensaje: "Token Inválido" });
            }
            catch (error) {
                return Promise.reject({ mensaje: "Error al agregar los datos" });
            }
        });
    }
    modificar(req, headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validaToken(headers.authorization)) {
                    let resp = yield this._usuarioService.updUsuario(req);
                    return Promise.resolve(resp);
                }
                else
                    return Promise.resolve({ mensaje: "Token Inválido" });
            }
            catch (error) {
                return Promise.reject({ mensaje: "Error al modificar los datos" });
            }
        });
    }
    eliminar(nombreusuario, headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validaToken(headers.authorization)) {
                    let resp = yield this._usuarioService.delUsuario(nombreusuario);
                    return Promise.resolve(resp);
                }
                else
                    return Promise.resolve({ mensaje: "Token Inválido" });
            }
            catch (error) {
                return Promise.reject({ mensaje: "Error al eliminar los datos" });
            }
        });
    }
    validaToken(token) {
        try {
            jsonwebtoken_1.default.verify(token, pwdJwt);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    tslib_1.__param(0, (0, routing_controllers_1.HeaderParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "getUserInfo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/agregar'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.HeaderParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "agregar", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/modificar'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.HeaderParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "modificar", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/eliminar/:nombreusuario'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('nombreusuario')),
    tslib_1.__param(1, (0, routing_controllers_1.HeaderParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "eliminar", null);
UserInfoController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)(api_info_1.URL_INFO.contextPath + '/userInfo'),
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UserInfoController);
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=usuario.controlador.js.map