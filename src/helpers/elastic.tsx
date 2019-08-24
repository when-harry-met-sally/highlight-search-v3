import React from "react";
import * as _ from "lodash";

export const elastic = (filter: string, list: any[], paths: string[][]) => {
  let filteredList: object[] = [];

  const getDeepField: any = (
    originalObject: object,
    nestedObject: any,
    paths: string[],
    match: boolean
  ) => {
    console.log(typeof nestedObject, paths);
    if (!nestedObject) {
      nestedObject = originalObject;
    }
    paths = _.cloneDeep(paths);
    if (paths.length > 1) {
      const field: any = paths.shift();
      const deeper: any = getDeepField(
        originalObject,
        nestedObject[field],
        paths,
        match
      );
      if (deeper) {
        return deeper;
      }
    }
    const scanTarget = nestedObject[paths[0]];

    if (Array.isArray(scanTarget)) {
      if (scanTarget.length === 0) {
        return null;
      }
      if (typeof scanTarget[0] === "string") {
        let matchFound = false;
        scanTarget.forEach((item, i) => {
          const scanResults = scanDeepField(item);
          if (scanResults) {
            nestedObject[paths[0]][i] = scanResults;
            matchFound = true;
          }
        });
        if (matchFound && !match) {
          filteredList.push(originalObject);
        }
        return null;
      }
      if (typeof scanTarget[0] === 'object'){
        console.log('array of objects');
        return null;
      }
    }
    const scanResults = scanDeepField(scanTarget);
    if (scanResults) {
      nestedObject[paths[0]] = scanResults;
      if (!match) {
        filteredList.push(originalObject);
      }
      return nestedObject[paths[0]];
    }
    return null;
  };

  const scanDeepField: any = (object: any) => {
    let match = false;
    if (!object) {
      return null;
    }
    const filterLength = filter.length;
    let newField = [];
    for (let c = 0; c < object.length; c++) {
      const comparison = object.slice(c, c + filterLength);
      if (comparison.toLowerCase() === filter.toLowerCase()) {
        match = true;
        newField.push(
          <span key={c} className="hl">
            {comparison}
          </span>
        );
        c += comparison.length - 1;
      } else {
        newField.push(<span key={c}>{object[c]}</span>);
      }
    }
    object = newField;
    if (match) {
      return newField;
    }
    return null;
  };

  filter = filter && filter.trim();
  if (!filter) {
    return list;
  }

  filter = filter.trim();
  list = _.cloneDeep(list);
  list.forEach(object => {
    let match = false;
    paths.forEach(path => {
      if (getDeepField(object, null, path, match)) {
        match = true;
      }
    });
  });
  return filteredList;
};
