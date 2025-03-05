import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../enviroments/enviroment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    getUser(){
      return JSON.parse(sessionStorage.getItem("user")?? "{}")
    }

    getToken(){
      return sessionStorage.getItem('token')
    }

    removeToken(){
      sessionStorage.removeItem('token');
    }

    setUser(user: User){
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    setToken(token: string){
      sessionStorage.setItem('token', token);
    }
}