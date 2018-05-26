import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';


import { Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';

/* Naming NOTE
  The API's file field is `fileItem` thus, we name it the same below
  it's like saying <input type='file' name='fileItem' />
  on a standard file field
*/


@Injectable()
export class FileUploadClientService {
    apiBaseURL = 'http://127.0.0.1:8000/api/'
    constructor(private http: HttpClient){ }

    fileUpload(fileItem:File, extraData?:object):any{
      let apiCreateEndpoint = `${this.apiBaseURL}files/create/`
      const formData: FormData = new FormData();

      formData.append('file', fileItem);
      formData.append('profileId', "1");
      formData.append('moduleName', "franchise");
      formData.append('fileType', "images");
      // if (extraData) {
      //   for(let key in extraData){
      //       // iterate and set other form data
      //     formData.append(key, extraData[key])
      //   }
      // }

      const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
    }

  optionalFileUpload(fileItem?:File, extraData?:object):any{
      let apiCreateEndpoint = 'http://14.142.204.102:8080/rnhadmin/sec/v1/uploadFiles';
      const formData: FormData = new FormData(); //?
       let fileName;
      if (extraData) {
        for(let key in extraData){
            // iterate and set other form data
            if (key == 'fileName'){
              fileName = extraData[key]
            }
          formData.append(key, extraData[key])
        }
      }

      if (fileItem){
        if (!fileName){
           fileName = fileItem.name
        }
        formData.append('image', fileItem, fileName);
      }
      const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
  }
    list(): Observable<any>{
      const listEndpoint = 'http://14.142.204.102:8080/rnhadmin/sec/v1/uploadFiles';
      return this.http.get(listEndpoint)
    }

}
