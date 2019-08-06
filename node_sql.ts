import * as fs from "fs";
import { isArray } from "util";

export function FROM(data: any) {
  if (typeof data === "object") {
    return data;
  } else if (typeof data === "string") {
    let item = fs.readFileSync(data);
    item = JSON.parse(item.toString());
    return item;
  } else {
    return new Promise(async (resolve) => {
      await data().then(_data => {
        console.log(_data)
        resolve(_data);
      })
    });
  }
}

export function SELECT(
  args: Array<string>,
  FromFunc: any,
  whereFunc: any = undefined
) {
  let obj = {};
  let temp = null;

  if (typeof FromFunc === "undefined") {
    console.error("Need to pass a from function");
  } else if (typeof FromFunc === "object") {
    temp = FromFunc;
  } else {
    temp = FromFunc();
  }
  if (typeof whereFunc !== "undefined" && typeof whereFunc === "function") {
    debugger;
    temp = whereFunc(temp);
  }

  if (typeof temp === undefined) {
    return null;
  } else if (isArray(temp)) {
    let arr  = [];
    for (const __item of temp) {
      obj  = {};
      for (const key of args) {
        obj[key] = GetChildValue(key, __item);
      }
      arr.push(obj)
    }
    return arr;
  } else {
    for (const key of args) {
      obj[key] = GetChildValue(key, temp);
    }
  }
  return obj;
}
export function WHERE(predicate: any) {
  return function(data) {
    return data.filter(predicate);
  };
}
function GetChildValue(key: string, item) {
  let retItem = item;
  const keys = key.split(".");
  for (const _key of keys) {
    retItem = retItem[_key];
  }
  return retItem;
}
