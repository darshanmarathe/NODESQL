import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";
const fs = require("fs")

var values =  SELECT(["versionnumber version" , "rocket_envelopename fullname" , "createdon createdAt"] , 
FROM('./19-10-2019.json'));

console.log(values)

fs.writeFile("19-10-2019.out.json", values, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});