import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { NewPhoto } from './newPhoto';
import { PhotoComment } from './photo-comment';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }

    upload(photo: NewPhoto) {

        const formData = new FormData();
        formData.append('description', photo.description);
        formData.append('allowComments', photo.allowComments.toString());
        formData.append('imageFile', photo.file);

        return this.http.post(API + '/photos/upload', formData);
    }

    findById(id: number) {
        return this.http.get<Photo>(API + '/photos/' + id);
    }

    getComments(id: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + id + '/comments');
    }

    addComments(photoId: number, commentText: string) {
        return this.http.post(API + '/photos/' + photoId + '/comments', { commentText })
    }
}
