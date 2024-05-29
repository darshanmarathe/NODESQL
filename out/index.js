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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var node_sql_1 = require("./node_sql");
var fetch = require("node-fetch");
var data = {
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
var res = (0, node_sql_1.SELECT)(["firstName fname", "lastName lname", "status.from"], (0, node_sql_1.FROM)(data));
console.log(res);
var resEval = (0, node_sql_1.SELECT)([function fullName(row) {
        return row.firstName + ' ' + row.lastName;
    }, "status.from"], (0, node_sql_1.FROM)(data));
console.log(resEval);
var resline = (0, node_sql_1.SELECT)("firstName, lastName, status.from from, status.address.city city", (0, node_sql_1.FROM)(data));
console.log(resline);
var resstar = (0, node_sql_1.SELECT)(["*"], (0, node_sql_1.FROM)(data));
console.log("*", resstar);
//JSON File
var res2 = (0, node_sql_1.SELECT)(["name", "models", function ModelStr(row) {
        return row.models.join('-');
    }, function ModelStrLen(row) {
        console.log(row);
        return row.ModelStr.length;
    }], (0, node_sql_1.FROM)("./data.json"), (0, node_sql_1.WHERE)(function (x) { return x.models.length > 2; }));
console.log(res2);
//remote url
function runQuery() {
    return __awaiter(this, void 0, void 0, function () {
        var res3, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = node_sql_1.SELECT;
                    _b = [["login", "id", "url"]];
                    _c = node_sql_1.FROM;
                    return [4 /*yield*/, fetchData()];
                case 1:
                    res3 = _a.apply(void 0, _b.concat([_c.apply(void 0, [_d.sent()])]));
                    console.log(res3);
                    return [2 /*return*/];
            }
        });
    });
}
runQuery();
//For now Not supported Subqueries
var item = (0, node_sql_1.SELECT)(["models"], (0, node_sql_1.FROM)((0, node_sql_1.SELECT)(["name", "models"], (0, node_sql_1.FROM)("./data.json"), (0, node_sql_1.WHERE)(function (x) { return x.models.length > 2; }))));
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.github.com/users/KrunalLathiya")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
console.log(item);
//JSON File With GROUP By Clause
var resGroupBy = (0, node_sql_1.SELECT)(["*"], (0, node_sql_1.FROM)("./data.json"), null, (0, node_sql_1.GROUPBY)(function (acc, x) {
    x.modelCount = x.models.length;
    acc.push(x);
    return acc;
}, []));
console.log("resGroupBy", resGroupBy);
//# sourceMappingURL=index.js.map