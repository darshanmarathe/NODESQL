const csv = require('csv-parser')
const fs = require('fs')
import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";






async function main(){
   const data = await  readData('./trees.csv' , (row) => {
        return SELECT('Index, Girth, Volume(ft^3) volume' , FROM(row))
   
   } ,(row)=> {
         console.log(row)
   });	


}


function readData(path:string , mapper:Function , saver:Function){
    return new Promise((resolve, reject) => {
        var data = []
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', function (row) {
            row = mapper(row)
          data.push(row)
          saver(row)
        })
        .on('end', function () {
          resolve(data)
        })
    })
}


main() 