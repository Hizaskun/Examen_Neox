"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
require("module-alias/register");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const config_1 = require("../app/config");
const routing_controllers_1 = require("routing-controllers");
const http = tslib_1.__importStar(require("http"));
const baseDir = __dirname;
const expressApp = (0, express_1.default)();
// Handling the DependencyInjection across the entire application
(0, routing_controllers_1.useContainer)(typedi_1.default);
// Loads all the Controllers from the directories and provides the routing facility
(0, routing_controllers_1.useExpressServer)(expressApp, {
    routePrefix: config_1.ENV_CONFIG.app.apiRoot,
    defaultErrorHandler: false,
    controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
const server = http.createServer(expressApp);
server.listen(config_1.ENV_CONFIG.app.port, () => {
    console.log('Server', 'Application running on', `${config_1.ENV_CONFIG.app.hostname}:${config_1.ENV_CONFIG.app.port}`);
});
// Handling the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
    console.log('Server', 'unhandledRejectionError :', `${error}`);
});
//# sourceMappingURL=index.js.map