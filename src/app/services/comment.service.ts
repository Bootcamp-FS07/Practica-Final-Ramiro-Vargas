import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Comment } from '../models/comment.model';
import { CommentCreated } from '../models/comment-created-mode';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getAllByPost(postId: string): Observable<Comment[]> {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<Comment[]>(`${this.apiUrl}/comment`, { params });
  }

  createCommentOnPost(
    postId: string,
    text: string
  ): Observable<CommentCreated> {
    const user = this.storageService.getUser();
    return this.http.post<CommentCreated>(`${this.apiUrl}/comment`, {
      text: text,
      author: user._id,
      post: postId,
    });
  }
}
