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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var util_1 = require("util");
function FROM(data) {
    var _this = this;
    if (typeof data === "object") {
        return data;
    }
    else if (typeof data === "string") {
        var item = fs.readFileSync(data);
        item = JSON.parse(item.toString());
        return item;
    }
    else {
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data().then(function (_data) {
                            console.log(_data);
                            resolve(_data);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
exports.FROM = FROM;
function SELECT(args, FromFunc, whereFunc, groupByFunc) {
    if (whereFunc === void 0) { whereFunc = undefined; }
    if (groupByFunc === void 0) { groupByFunc = undefined; }
    var obj = {};
    var temp = null;
    if (typeof FromFunc === "undefined") {
        console.error("Need to pass a from function");
    }
    else if (typeof FromFunc === "object") {
        temp = FromFunc;
    }
    else {
        temp = FromFunc();
    }
    if (typeof whereFunc !== "undefined" && typeof whereFunc === "function") {
        temp = whereFunc(temp);
    }
    if (temp != undefined && (args.length === 0 || args[0] === "*")) {
        if (util_1.isArray(temp) && temp.length > 0)
            args = Object.keys(temp[0]);
        else
            args = Object.keys(temp);
    }
    if (typeof temp === undefined) {
        return null;
    }
    else if (util_1.isArray(temp)) {
        var arr = [];
        for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
            var __item = temp_1[_i];
            var tobj = {};
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var key = args_1[_a];
                var split = key.split(' ');
                var newKey = split.length > 1 ? split[1] : split[0];
                tobj[newKey] = GetChildValue(split[0], __item);
            }
            arr.push(tobj);
        }
        obj = arr;
    }
    else {
        for (var _b = 0, args_2 = args; _b < args_2.length; _b++) {
            var key = args_2[_b];
            obj[key] = GetChildValue(key, temp);
        }
    }
    if (typeof groupByFunc !== "undefined" && typeof groupByFunc === "function") {
        obj = groupByFunc(obj);
    }
    return obj;
}
exports.SELECT = SELECT;
function WHERE(predicate) {
    return function (data) {
        return data.filter(predicate);
    };
}
exports.WHERE = WHERE;
function GROUPBY(reducerFunc, accumulator) {
    return function (data) {
        return data.reduce(reducerFunc, accumulator);
    };
}
exports.GROUPBY = GROUPBY;
function GetChildValue(key, item) {
    var retItem = item;
    var keys = key.split(".");
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var _key = keys_1[_i];
        retItem = retItem[_key];
    }
    return retItem;
}
