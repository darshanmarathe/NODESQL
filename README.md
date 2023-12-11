
  

**

  

# SQL Like Syntax In Node for JSON

  

**

  

  

**General Capabilities**

  

  

1. Pass Data

2. Pass JSON File Path

3. SELECT, FROM, WHERE Keywords

4. SUBQUERIES

  

   

Basic Query

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

  

Query JSON File

  

    let res2 = SELECT(
    
        ["name", "models"],
        
        FROM("./data.json"),
    
    WHERE(x => x.models.length > 2));

  

Query JSON Sub Queries

  

    let item = SELECT(
        
        ["models"],
        
        FROM(
        
            SELECT(
            
            ["name", "models"],
            
            FROM("./data.json"),
            
            WHERE(x => x.models.length > 2)
            
            ))
    
    );

  
  

Remote URLS



    async function runQuery(){
    
        let res3 = SELECT(["login", "id", "url"], FROM(await fetchData()));
        
        console.log(res3);
    
    }
    
    runQuery();



Alias Support 

    let resAlias = SELECT("firstName, lastName, status.from from, status.address.city city", FROM(data));
    console.log(resAlias);




Group By Clause

    
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




