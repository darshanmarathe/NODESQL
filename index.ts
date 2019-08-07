import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";
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

let resstar = SELECT(["*"], FROM(data));
console.log("*" , resstar);


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
  let response = await fetch("https://api.github.com/users/KrunalLathiya");
  return response.json();
 
}

console.log(item);

//JSON File With GROUP By Clause
let resGroupBy = SELECT(
    ["*"],
    FROM("./data.json"),
    null,
    GROUPBY((acc, x) => {
        x.modelCount = x.models.length
        acc.push(x);
        return acc;
    }, [])
  );
  
console.log("resGroupBy" ,resGroupBy);