import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";

import axios  from "axios";
const fs = require("fs")

var values =  SELECT(["versionnumber version" ,
"rocket_envelopename fullname" , 
"createdon createdAt" , 
"address1_addressid Address1",
"donotphone CanCallOnPhone"] , 
FROM('./19-10-2019.json') );

console.log(values)


async function PostData(values){
    for (const item of values) {
       await  axios.post('http://dhruv/postdata' , item)
    }

}

PostData(values);


fs.writeFile("19-10-2019.out.json", JSON.stringify(values), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);

    }
     console.log("JSON file has been saved.");
});