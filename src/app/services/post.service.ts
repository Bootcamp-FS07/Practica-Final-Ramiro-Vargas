import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/post`);
  }

  deletePost(id:string): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/post/${id}`);
  }

  createPost(post : Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/post`,{
      "text":post.text,
      "author":{
        "username":post.author.username,
        "_id":post.author._id
      }
    });
  }
}