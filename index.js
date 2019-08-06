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
const node_sql_1 = require("./node_sql");
const fetch = require("node-fetch");
const data = {
    firstName: "Darshan",
    lastName: "marathe",
    age: 20,
    status: {
        loggedin: true,
        time: new Date(),
        from: "web"
    }
};
let res = node_sql_1.SELECT(["firstName", "lastName", "status.from"], node_sql_1.FROM(data));
console.log(res);
let resstar = node_sql_1.SELECT(["*"], node_sql_1.FROM(data));
console.log("*", resstar);
//JSON File
let res2 = node_sql_1.SELECT(["name", "models"], node_sql_1.FROM("./data.json"), node_sql_1.WHERE(x => x.models.length > 2));
console.log(res2);
//remote url
function runQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        let res3 = node_sql_1.SELECT(["login", "id", "url"], node_sql_1.FROM(yield fetchData()));
        console.log(res3);
    });
}
runQuery();
//For now Not supported Subqueries
let item = node_sql_1.SELECT(["models"], node_sql_1.FROM(node_sql_1.SELECT(["name", "models"], node_sql_1.FROM("./data.json"), node_sql_1.WHERE(x => x.models.length > 2))));
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        // return new Promise((resolve) => {
        let response = yield fetch("https://api.github.com/users/KrunalLathiya");
        return response.json();
        // })
        // .catch(error => console.error(error))
        // })
    });
}
console.log(item);
