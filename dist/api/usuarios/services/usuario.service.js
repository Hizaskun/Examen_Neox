"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const client_1 = require("@prisma/client");
const ts_md5_1 = require("ts-md5");
const prisma = new client_1.PrismaClient();
let UsuarioService = class UsuarioService {
    constructor() { }
    getUsuario() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield prisma.usuario.findMany();
        });
    }
    getUsuarioByNombre(nombreUsuario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield prisma.usuario.findUnique({
                where: { nombreUsuario: nombreUsuario }
            });
        });
    }
    getUsuarioByCorreo(correo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield prisma.usuario.findFirst({
                where: { correo: correo }
            });
        });
    }
    addUsuario(usuario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            usuario.password = ts_md5_1.Md5.hashStr(usuario.password);
            const { nombres, apellidos, correo, codigoSecreto, nombreUsuario, password, indicadorBloqueo, nroIntentos } = usuario;
            return yield prisma.usuario.create({
                data: {
                    nombres,
                    apellidos,
                    correo,
                    codigoSecreto,
                    nombreUsuario,
                    password,
                    indicadorBloqueo,
                    nroIntentos
                }
            });
        });
    }
    updUsuario(usuario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const correo = usuario.correo;
            return yield prisma.usuario.update({
                where: { correo: correo },
                data: usuario
            });
        });
    }
    delUsuario(nombreUsuario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield prisma.usuario.delete({
                where: { nombreUsuario: nombreUsuario }
            });
        });
    }
};
UsuarioService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map