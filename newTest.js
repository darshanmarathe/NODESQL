"use strict";
exports.__esModule = true;
var node_sql_1 = require("./node_sql");
var values = node_sql_1.SELECT(["versionnumber version", "rocket_envelopename fullname", "createdon createdAt"], node_sql_1.FROM('./19-10-2019.json'));
console.log(values);
