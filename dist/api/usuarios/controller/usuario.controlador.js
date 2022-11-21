"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const api_info_1 = require("../api-info");
const usuario_service_1 = require("../services/usuario.service");
let UserInfoController = class UserInfoController {
    constructor(_userInfoSvc) {
        this._userInfoSvc = _userInfoSvc;
    }
    getUserInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this._userInfoSvc.userInfoExecuter();
                console.log('Controller: getUserInfo', 'response:' + JSON.stringify(resp));
                return Promise.resolve(resp);
            }
            catch (error) {
                console.log('Controller: getUserInfo', 'errorInfo:' + JSON.stringify(error));
                return Promise.reject(error);
            }
        });
    }
    getUserInfoById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this._userInfoSvc.userInfoExecuterById(userId);
                console.log('Controller: getUserInfoById', 'response:' + JSON.stringify(resp));
                return Promise.resolve(resp);
            }
            catch (error) {
                console.log('Controller: getUserInfoById', 'errorInfo:' + JSON.stringify(error));
                return Promise.reject(error);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/getUserInfo'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "getUserInfo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/getUserInfoById'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserInfoController.prototype, "getUserInfoById", null);
UserInfoController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)(api_info_1.URL_INFO.contextPath + '/userInfo'),
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [usuario_service_1.userInfoSvc])
], UserInfoController);
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=usuario.controlador.js.map