import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpService {

    constructor(private http:HttpClient) { }

    private userData = JSON.parse(localStorage.getItem("storedData"));

    getData(url) {
        // console.log(this.userData);
        let httpOptions = new HttpHeaders({
            'AUTH_TOKEN': JSON.parse(localStorage.getItem("storedData")).authToken,
            'DEVICE_ID': '',
            'DEVICE_TYPE': 'WEB'
        });
        return this.http.get(url, {headers: httpOptions, observe: 'response'})
            .catch((error: any) => {
                return Observable.throw(error);
            })
    }

    postData(url, data) {
        let httpOptions = new HttpHeaders({
            'AUTH_TOKEN': JSON.parse(localStorage.getItem("storedData")).authToken,
            'DEVICE_ID': '',
            'DEVICE_TYPE': 'WEB'
        });
        return this.http.post(url, data, {headers: httpOptions, observe: 'response'})
            .catch((error: any) => {
                return Observable.throw(error);
            })
    }

    updateData(url, data) {
        let httpOptions = new HttpHeaders({
            'AUTH_TOKEN': JSON.parse(localStorage.getItem("storedData")).authToken,
            'DEVICE_ID': '',
            'DEVICE_TYPE': 'WEB'
        });
        return this.http.post(url, data, {headers: httpOptions, observe: 'response'})
                .map(
                    json => {
                        return json;
                    },
                    err => {
                        return err;
                    }
                );
    }

    deleteData(url) {
        let httpOptions = new HttpHeaders({
            'AUTH_TOKEN': JSON.parse(localStorage.getItem("storedData")).authToken,
            'DEVICE_ID': '',
            'DEVICE_TYPE': 'WEB'
        });
        return this.http.delete(url, {headers: httpOptions, observe: 'response'})
                .map(
                    json => {
                        return json;
                    },
                    err => {
                        return err;
                    }
                );
    }

    editData(url) {
        let httpOptions = new HttpHeaders({
            'AUTH_TOKEN': JSON.parse(localStorage.getItem("storedData")).authToken,
            'DEVICE_ID': '',
            'DEVICE_TYPE': 'WEB'
        });
        return this.http.put(url, {}, {headers: httpOptions, observe: 'response'})
                .map(
                    json => {
                        return json;
                    },
                    err => {
                        return err;
                    }
                );
    }

}
