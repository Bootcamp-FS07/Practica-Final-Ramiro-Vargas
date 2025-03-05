import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storageService: StorageService, 
    private userService: UserService, private router: Router) {}

  login(username: string, password: string) {
    var response = this.http.post<Login>(`${this.apiUrl}/auth/login`, { username, password });
    response.subscribe(
      {next: (login)=>{
        this.storageService.setToken(login.access_token);
        this.userService.getAll().subscribe({next: (users)=>{
        const filteredUser  = users.filter(user => user.username === username);
        this.storageService.setUser(filteredUser[0]);
        this.router.navigate([''])
    }})
      },
      error: (error)=>{
        this.router.navigate(['/login'])
      }
      })
    
  }

  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signup`, { username, password });
  }
}
