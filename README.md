
**

# SQL Like Syntax In Node for JSON

**

  

**General Capabilities**

  
  

 1. Pass Data
 2. Pass JSON File Path
 3. SELECT, FROM, WHERE Keywords
 4. SUBQUERIES 

  
  
   import { SELECT, FROM, WHERE } from "./node_sql";



Basic Query 
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

    let  res  =  SELECT(["firstName", "lastName", "status.from"], FROM(data));

Query JSON File 

    let  res2  =  SELECT(
	["name", "models"],
	FROM("./data.json"),
	WHERE(x  =>  x.models.length  >  2));

Query JSON Sub Queries 

    let  item  =  SELECT(
    		["models"],
    		FROM(
    			SELECT(
    			["name", "models"],
    			FROM("./data.json"),
    			WHERE(x  =>  x.models.length  >  2)
    		))
    	);


Remote URLS

     //remote url

    async function runQuery(){
        let res3 = SELECT(["login", "id", "url"], FROM(await fetchData()));
        console.log(res3);
    }
     
    runQuery();
 