import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";


var values =  SELECT(["versionnumber version" , "rocket_envelopename fullname" , "createdon createdAt"] , FROM('./19-10-2019.json'));

console.log(values)
