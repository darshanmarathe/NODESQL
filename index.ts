import { SELECT, FROM, WHERE } from "./node_sql";
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

let res = SELECT(["firstName", "lastName", "status.from"], FROM(data));
console.log(res);

//JSON File
let res2 = SELECT(
  ["name", "models"],
  FROM("./data.json"),
  WHERE(x => x.models.length > 2)
);

console.log(res2);

//remote url

async function runQuery(){
    let res3 = SELECT(["login", "id", "url"], FROM(await fetchData()));
    console.log(res3);
}

runQuery();

//For now Not supported Subqueries
let item = SELECT(
  ["models"],
  FROM(
    SELECT(
      ["name", "models"],
      FROM("./data.json"),
      WHERE(x => x.models.length > 2)
    )
  )
);

async function fetchData() {
  // return new Promise((resolve) => {
  let response = await fetch("https://api.github.com/users/KrunalLathiya");
  return response.json();
  // })
  // .catch(error => console.error(error))

  // })
}

console.log(item);
