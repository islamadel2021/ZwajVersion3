import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  private http = inject(HttpClient);

  values: any;

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5082/values').subscribe({
      next: (response) => {
        this.values = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
