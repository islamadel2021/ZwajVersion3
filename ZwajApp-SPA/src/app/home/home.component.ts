import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RegisterComponent],
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);

  registerMode = false;

  constructor() {}

  ngOnInit(): void {}

  registerToggle(): void {
    this.registerMode = true;
  }

  cancelRegister(mode: boolean): void {
    this.registerMode = mode;
  }
}
