import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatToolbarModule, MatMenuModule, RouterOutlet, MatListModule, MatIconModule,
    MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router, private storageService: StorageService) {}
  onHomeClick() {
    this.router.navigate(['/home']);
  }
  onLogout(){
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }
}
