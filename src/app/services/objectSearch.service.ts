import { Injectable } from '@angular/core';

@Injectable()
export class ObjectSearch {

    constructor() { }

    doSearch(obj, targetProp, targetValue) {
        let matchedObj;

        function getObject(theObject) {
            let result = null;
            if (theObject instanceof Array) {
                for (let i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            }
            else {
                for (let prop in theObject) {
                    if (theObject.hasOwnProperty(prop)) {
                        if (prop === targetProp) {
                            if (theObject[prop] === targetValue) {
                                matchedObj = theObject;
                            }
                        }
                        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                            getObject(theObject[prop]);
                        }
                    }
                }
            }
        }

        getObject(obj);

        return matchedObj;

    }


    searchIdsByCheckVal(obj:any, searchedKey:string, searchedKeyVal:any, returnKey:string):any[] {

        let objToArray = [];
        let returnArr = [];

        let objectKeys = Object.keys(obj);
        for(let i of objectKeys) {
            objToArray.push(obj[i]);
        }

        let searchFunc = function(objToArray, searchedKey, searchedKeyVal, returnKey) {
            objToArray.forEach((elem) => {
                if(elem[searchedKey] == searchedKeyVal) {
                    returnArr.push(elem[returnKey]);
                }
                if(elem.children && elem.children.length > 0) {
                    searchFunc(elem.children, searchedKey, searchedKeyVal, returnKey);
                }
            })
        }

        searchFunc(objToArray, searchedKey, searchedKeyVal, returnKey);

        return returnArr;

    }

}
