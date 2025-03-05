import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatToolbarModule, MatMenuModule, RouterOutlet, MatListModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router) {}
  onHomeClick() {
    this.router.navigate(['/home']);
  }
  onLogout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
