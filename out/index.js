"use strict";
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
        from: "web"
    }
};
//JSON File
var resGroupBy = node_sql_1.SELECT(["*"], node_sql_1.FROM("./data.json"), null, node_sql_1.GROUPBY(function (acc, x) {
    x.modelCount = x.models.length;
    acc.push(x);
    return acc;
}, []));
console.log("resGroupBy", resGroupBy);
// let res = SELECT(["firstName", "lastName", "status.from"], FROM(data));
// console.log(res);
// let resstar = SELECT(["*"], FROM(data));
// console.log("*" , resstar);
// //JSON File
// let res2 = SELECT(
//   ["name", "models"],
//   FROM("./data.json"),
//   WHERE(x => x.models.length > 2)
// );
// console.log(res2);
// //remote url
// async function runQuery(){
//     let res3 = SELECT(["login", "id", "url"], FROM(await fetchData()));
//     console.log(res3);
// }
// runQuery();
// //For now Not supported Subqueries
// let item = SELECT(
//   ["models"],
//   FROM(
//     SELECT(
//       ["name", "models"],
//       FROM("./data.json"),
//       WHERE(x => x.models.length > 2)
//     )
//   )
// );
// async function fetchData() {
//   // return new Promise((resolve) => {
//   let response = await fetch("https://api.github.com/users/KrunalLathiya");
//   return response.json();
//   // })
//   // .catch(error => console.error(error))
//   // })
// }
// console.log(item);
//# sourceMappingURL=index.js.map