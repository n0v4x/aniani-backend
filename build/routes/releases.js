"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_1 = __importDefault(require("url"));
const GogoanimeApi_1 = __importDefault(require("../services/GogoanimeApi"));
const api = GogoanimeApi_1.default.getInstance();
const router = express_1.Router();
const fullUrl = (req) => {
    return url_1.default.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: req.baseUrl,
    });
};
router.get(["/", "/:page"], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.params.page) || 1;
    const next = `${fullUrl(req)}/${page + 1}`;
    try {
        const releases = yield api.releases(page);
        res.json({
            page,
            next,
            data: releases,
        });
    }
    catch (e) {
        res.status(404).json({
            error: 404,
            msg: e.message,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=releases.js.map