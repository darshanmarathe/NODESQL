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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util_1 = require("util");
function FROM(data) {
    if (typeof data === "object") {
        return data;
    }
    else if (typeof data === "string") {
        let item = fs.readFileSync(data);
        item = JSON.parse(item.toString());
        return item;
    }
    else {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield data().then(_data => {
                console.log(_data);
                resolve(_data);
            });
        }));
    }
}
exports.FROM = FROM;
function SELECT(args, FromFunc, whereFunc = undefined, groupByFunc = undefined) {
    let obj = {};
    let temp = null;
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
        let arr = [];
        for (const __item of temp) {
            let tobj = {};
            for (const key of args) {
                const split = key.split(' ');
                let newKey = split.length > 1 ? split[1] : split[0];
                tobj[newKey] = GetChildValue(split[0], __item);
            }
            arr.push(tobj);
        }
        obj = arr;
    }
    else {
        for (const key of args) {
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
    let retItem = item;
    const keys = key.split(".");
    for (const _key of keys) {
        retItem = retItem[_key];
    }
    return retItem;
}
