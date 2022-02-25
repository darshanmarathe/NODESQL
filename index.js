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
const node_sql_1 = require("./node_sql");
const fetch = require("node-fetch");
const data = {
    firstName: "Darshan",
    lastName: "marathe",
    age: 20,
    status: {
        loggedin: true,
        time: new Date(),
        from: "web",
        address: {
            city: "Pune",
            state: "Maharashtra",
            country: 'India'
        }
    }
};
let res = (0, node_sql_1.SELECT)(["firstName", "lastName", "status.from"], (0, node_sql_1.FROM)(data));
console.log(res);
let resline = (0, node_sql_1.SELECT)("firstName, lastName, status.from, status.address.city", (0, node_sql_1.FROM)(data));
console.log(resline);
let resstar = (0, node_sql_1.SELECT)(["*"], (0, node_sql_1.FROM)(data));
console.log("*", resstar);
//JSON File
let res2 = (0, node_sql_1.SELECT)(["name", "models"], (0, node_sql_1.FROM)("./data.json"), (0, node_sql_1.WHERE)(x => x.models.length > 2));
console.log(res2);
//remote url
function runQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        let res3 = (0, node_sql_1.SELECT)(["login", "id", "url"], (0, node_sql_1.FROM)(yield fetchData()));
        console.log(res3);
    });
}
runQuery();
//For now Not supported Subqueries
let item = (0, node_sql_1.SELECT)(["models"], (0, node_sql_1.FROM)((0, node_sql_1.SELECT)(["name", "models"], (0, node_sql_1.FROM)("./data.json"), (0, node_sql_1.WHERE)(x => x.models.length > 2))));
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("https://api.github.com/users/KrunalLathiya");
        return response.json();
    });
}
console.log(item);
//JSON File With GROUP By Clause
let resGroupBy = (0, node_sql_1.SELECT)(["*"], (0, node_sql_1.FROM)("./data.json"), null, (0, node_sql_1.GROUPBY)((acc, x) => {
    x.modelCount = x.models.length;
    acc.push(x);
    return acc;
}, []));
console.log("resGroupBy", resGroupBy);
