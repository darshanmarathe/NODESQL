"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_sql_1 = require("./node_sql");
const fs = require("fs");
var values = node_sql_1.SELECT(["versionnumber version",
    "rocket_envelopename fullname",
    "createdon createdAt",
    "address1_addressid Address1",
    "donotphone CanCallOnPhone"], node_sql_1.FROM('./19-10-2019.json'));
console.log(values);
fs.writeFile("19-10-2019.out.json", JSON.stringify(values), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});
