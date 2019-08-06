"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_sql_1 = require("./node_sql");
const data = {
    firstName: "Darshan",
    lastName: "marathe",
    age: 20
};
node_sql_1.SELECT(["firstName", "lastName"], node_sql_1.FROM(data)).then(result => {
    console.log(result);
});
node_sql_1.SELECT(["name"], node_sql_1.FROM('./data.json')).then(result => {
    console.log(result);
}, node_sql_1.WHERE((x) => x.name == 'Fiat'));
