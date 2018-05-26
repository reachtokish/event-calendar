import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from "rxjs/Rx";
import { UPLOAD_FILE } from '../constants/app.constant';

@Injectable()
export class UploadFile {

    constructor(private http: HttpService) { }

    public upload(file, profileId, moduleName, fileType) {

        const formData: FormData = new FormData();
        formData.append("file", file);
        formData.append("profileId", profileId);
        formData.append("moduleName", moduleName);
        formData.append("fileType", fileType);

        return this.http.postData(UPLOAD_FILE, formData);

    }

}
