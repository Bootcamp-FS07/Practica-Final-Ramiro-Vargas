import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) {} // Constructor debe ir primero

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }
}
