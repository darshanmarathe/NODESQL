import {SELECT , FROM, WHERE} from "./node_sql";

const data = {
  firstName: "Darshan",
  lastName: "marathe",
  age: 20
};


SELECT(["firstName", "lastName"], FROM(data)).then(result => {
    console.log(result)
})



SELECT(["name"], FROM('./data.json')).then(result => {
    console.log(result)
}, WHERE((x) => x.name == 'Fiat'))
