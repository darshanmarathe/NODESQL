import * as fs from 'fs';
import { isString } from 'util';

export function FROM(data: any) {
  if (typeof data === "object") {
    return data;
  } 
  else if(typeof data === 'string'){
      let item =  fs.readFileSync(data);
      item  = JSON.parse(item.toString());
      return item;
  }
  else {
    return new Promise(resolve => {
      console.log(data, "resolving");
      resolve(data);
    });
  }
}

export async function SELECT(args: Array<string>, FromFunc: any , whereFunc:any = undefined) {
  let obj = {};
  let temp = null;

  if (typeof FromFunc === "undefined") {
    console.error("Need to pass a from function");
  } else if (typeof FromFunc === "object") {
    temp = FromFunc;
  } else {
    temp = await FromFunc();
  }
  if(typeof whereFunc !== 'undefined' && typeof whereFunc === 'function' ){
    debugger; 
    const wherefun  = whereFunc();
    temp = wherefun(temp)
  }

  if (temp) {
    for (const key of args) {
      obj[key] = GetChildValue(key , temp);
    }
  }
  return obj;
}
export function WHERE(predicate:any){
    console.log(predicate)
    return function (data) {
        console.log("data" , data)
        return data.filter(predicate)
    }
}
function GetChildValue(key:string , item) {
    let retItem = item;
    const keys = key.split('.');
    for (const _key of keys) {
        retItem = retItem[_key]
    }
    return retItem;
}