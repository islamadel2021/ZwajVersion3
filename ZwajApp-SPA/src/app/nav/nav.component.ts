import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [FormsModule, CommonModule, BsDropdownModule],
})
export class NavComponent {
  model: { username?: string; password?: string } = {};

  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
  ) {}

  login(): void {
    this.authService.login(this.model).subscribe({
      next: () => {
        console.log('تم الدخول بنجاح');
        this.alertifyService.success('تم الدخول بنجاح');
      },
      error: (error) => {
        console.log('فشل في الدخول', error);
        this.alertifyService.error(error + ' - فشل في الدخول');
      },
    });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  loggedOut(): void {
    localStorage.removeItem('token');
    this.alertifyService.success('تم الخروج بنجاح');
  }
}
