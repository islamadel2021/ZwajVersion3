import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [FormsModule, CommonModule],
})
export class NavComponent {
  model: { username?: string; password?: string } = {};

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.model).subscribe({
      next: () => console.log('تم الدخول بنجاح'),
      error: (error) => console.log('فشل في الدخول', error),
    });
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // بترجع true لو التوكن موجود وfalse لو مش موجود
  }

  loggedOut(): void {
    localStorage.removeItem('token');
    console.log('تم الخروج بنجاح');
  }
}
