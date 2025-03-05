import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,
    ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm: FormGroup;
  hide = false;
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.get('name')?.value, this.userForm.get('password')?.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.access_token);
          this.userService.getAll().subscribe({next: (users)=>{
            const filteredUser  = users.filter(user => user.username === this.userForm.get('name')?.value);
            sessionStorage.setItem('user', JSON.stringify(filteredUser[0]));
            this.router.navigate([''])
          }})
        },
        error: (err) => {
          console.error('Error en el login', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
