import * as fs from "fs";

export function FROM(data: any) {
  if (typeof data === "object") {
    return data;
  } else if (typeof data === "string") {
    let item = fs.readFileSync(data);
    item = JSON.parse(item.toString());
    return item;
  } else {
    return new Promise(async (resolve) => {
      await data().then((_data) => {
        console.log(_data);
        resolve(_data);
      });
    });
  }
}

export function SELECT(
  args: Array<string> | string,
  FromFunc: any,
  whereFunc: any = undefined,
  groupByFunc: any = undefined
) {
  let obj = {};
  let temp = null;

  if (!Array.isArray(args)) {
    args = args.split(",").map((x) => x.trim());
  }
  if (typeof FromFunc === "undefined") {
    console.error("Need to pass a from function");
  } else if (typeof FromFunc === "object") {
    temp = FromFunc;
  } else {
    temp = FromFunc();
  }
  if (typeof whereFunc !== "undefined" && typeof whereFunc === "function") {
    temp = whereFunc(temp);
  }

  if (temp != undefined && (args.length === 0 || args[0] === "*")) {
    if (Array.isArray(temp) && temp.length > 0) args = Object.keys(temp[0]);
    else args = Object.keys(temp);
  }

  if (typeof temp === undefined) {
    return null;
  } else if (Array.isArray(temp)) {
    let arr = [];
    for (const __item of temp) {
      let tobj = {};
      for (const key of args) {
        const split = key.split(" ");
        let newKey = split.length > 1 ? split[1] : split[0];
        tobj[newKey] = GetChildValue(split[0], __item);
      }
      arr.push(tobj);
    }
    obj = arr;
  } else {
    for (const key of args) {
      const split = key.split(" ");
      let newKey = split.length > 1 ? split[1] : split[0];
      obj[newKey] = GetChildValue(split[0], temp);
    }
  }
  if (typeof groupByFunc !== "undefined" && typeof groupByFunc === "function") {
    obj = groupByFunc(obj);
  }

  return obj;
}
export function WHERE(predicate: any) {
  return function (data) {
    return data.filter(predicate);
  };
}

function GetKeys(str: string) {
  if (str.indexOf(" ") > -1) {
    return [str, str];
  } else {
    return [str.split(" ")[0], str.split(" ")[1]];
  }
}

export function GROUPBY(reducerFunc: any, accumulator: any) {
  return function (data) {
    return data.reduce(reducerFunc, accumulator);
  };
}
function GetChildValue(key: string, item) {
  let retItem = item;
  const keys = key.split(".");
  for (const _key of keys) {
    const split = _key.split(" ");
    let newKey = split.length > 1 ? split[1] : split[0];
    retItem = retItem[newKey];
  }
  return retItem;
}
