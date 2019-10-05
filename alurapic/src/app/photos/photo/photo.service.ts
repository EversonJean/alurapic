import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { NewPhoto } from './newPhoto';
import { PhotoComment } from './photo-comment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(environment.api_url + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(environment.api_url + '/' + userName + '/photos', { params });
    }

    upload(photo: NewPhoto) {

        const formData = new FormData();
        formData.append('description', photo.description);
        formData.append('allowComments', photo.allowComments.toString());
        formData.append('imageFile', photo.file);

        return this.http.post(environment.api_url + '/photos/upload',
            formData,
            {
                observe: 'events',
                reportProgress: true
            });
    }

    findById(id: number) {
        return this.http.get<Photo>(environment.api_url + '/photos/' + id);
    }

    getComments(id: number) {
        return this.http.get<PhotoComment[]>(environment.api_url + '/photos/' + id + '/comments');
    }

    addComments(photoId: number, commentText: string) {
        return this.http.post(environment.api_url + '/photos/' + photoId + '/comments', { commentText })
    }

    removePhoto(photoId: number) {
        return this.http.delete(environment.api_url + '/photos/' + photoId);
    }

    like(photoId: number) {
        return this.http.post(
            environment.api_url + '/photos/' + photoId + '/like', {}, { observe: 'response' }
        )
            .pipe(map(res => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }

}
