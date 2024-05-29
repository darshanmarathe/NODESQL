import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";
const fetch = require("node-fetch");

const data = {
  firstName: "Darshan",
  lastName: "marathe",
  age: 20,
  status: {
    loggedin: true,
    time: new Date(),
    from: "web",
    address : {
      city :  "Pune",
      state : "Maharashtra",
      country : 'India'
    }
  }
};


console.clear();


let res = SELECT(["firstName fname", "lastName lname", "status.from"], FROM(data));
console.log(res);


let resEval = SELECT([function fullName(row:any){
  return row.firstName + ' ' + row.lastName;
},function reverse(row){
  return row.fullName.length
},  "status.from"], FROM(data));
console.log(resEval);


let resline = SELECT("firstName, lastName, status.from from, status.address.city city", FROM(data));
console.log(resline);


let resstar = SELECT(["*"], FROM(data));
console.log("*" , resstar);


//JSON File
let res2 = SELECT(
  ["name", "models", function ModelStr(row){
    return row.models.join('-');
  }, function ModelStrLen(row){
    return row.ModelStr.length;
  }],
  FROM("./data.json"),
  WHERE(x => x.models.length > 2)
);

 console.log(res2);


// //remote url

async function runQuery(){
    let res3 = SELECT(["login", "id", "url"], FROM(await fetchData()));
    console.log(res3);
}

runQuery();

// //For now Not supported Subqueries
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


async function fetchComments(){
  let response = await fetch('https://jsonplaceholder.typicode.com/comments')
  return await response.json()
}

(async() => {
  
console.clear();
 const comments = SELECT(['id post_id' , 'name' 
 , function Email(row){
      // Regular expression to match all vowels (both uppercase and lowercase)
      const vowelRegex = /[AEIOUaeiou]/g;
      // Replace all matched vowels with 'X'
      return row.email.replace(vowelRegex, 'X');
  }
, function Body(row) {
  console.dir(row)
  return row.body.substring(0 , 100)
}] , FROM(await fetchComments()))
console.table(comments)
})();