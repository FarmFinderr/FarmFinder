import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'http://localhost:8888/images';  

  constructor(private http: HttpClient) {}

  uploadImage(file: File, postId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('postId', postId);

    console.log('FormData:', formData);
    return this.http.post(`${this.baseUrl}/`, formData);
  }

  getAllImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getImagesByPostId(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${postId}`);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${imageId}`);
  }
}
