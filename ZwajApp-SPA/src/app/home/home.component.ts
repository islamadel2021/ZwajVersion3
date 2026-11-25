import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RegisterComponent],
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerMode = false;

  constructor() {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/members']);
    }
  }

  registerToggle(): void {
    this.registerMode = true;
  }

  cancelRegister(mode: boolean): void {
    this.registerMode = mode;
  }
}
