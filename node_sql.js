"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function FROM(data) {
    if (typeof data === "object") {
        return data;
    }
    else if (typeof data === 'string') {
        let item = fs.readFileSync(data);
        item = JSON.parse(item.toString());
        return item;
    }
    else {
        return new Promise(resolve => {
            console.log(data, "resolving");
            resolve(data);
        });
    }
}
exports.FROM = FROM;
function SELECT(args, FromFunc, whereFunc = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = {};
        let temp = null;
        if (typeof FromFunc === "undefined") {
            console.error("Need to pass a from function");
        }
        else if (typeof FromFunc === "object") {
            temp = FromFunc;
        }
        else {
            temp = yield FromFunc();
        }
        if (typeof whereFunc !== 'undefined' && typeof whereFunc === 'function') {
            debugger;
            const wherefun = whereFunc();
            temp = wherefun(temp);
        }
        if (temp) {
            for (const key of args) {
                obj[key] = GetChildValue(key, temp);
            }
        }
        return obj;
    });
}
exports.SELECT = SELECT;
function WHERE(predicate) {
    console.log(predicate);
    return function (data) {
        console.log("data", data);
        return data.filter(predicate);
    };
}
exports.WHERE = WHERE;
function GetChildValue(key, item) {
    let retItem = item;
    const keys = key.split('.');
    for (const _key of keys) {
        retItem = retItem[_key];
    }
    return retItem;
}
