"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = exports.verifyUserId = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var verifyUserId = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        var id = decoded.user.id;
        if (id !== parseInt(req.params.id)) {
            throw new Error("User id does not match!");
        }
        next();
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
};
exports.verifyUserId = verifyUserId;
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
