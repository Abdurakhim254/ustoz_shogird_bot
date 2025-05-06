"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniversalService = createUniversalService;
const service_1 = require("../../service");
function createUniversalService(model) {
    return new service_1.UniversalService(model);
}
