import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: { username?: string; password?: string } = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register(): void {
    this.authService.register(this.model).subscribe({
      next: () => console.log('تم التسجيل بنجاح'),
      error: (error) => console.log('فشل في التسجيل', error),
    });
  }

  cancel(): void {
    console.log('ليس الأن');
    this.cancelRegister.emit(false);
  }
}
