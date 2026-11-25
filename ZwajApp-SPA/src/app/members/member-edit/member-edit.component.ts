import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  imports: [TabsModule, FormsModule, NgIf],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  user: User | null = null;

  @HostListener('window:beforeunload', ['$event'])
  unLoadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  route = inject(ActivatedRoute);
  alertService = inject(AlertifyService);
  userService = inject(UserService);
  authService = inject(AuthService);

  constructor() {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService
      .updateUser(Number(this.authService.decodedToken?.nameid), this.user!)
      .subscribe({
        next: () => {
          this.alertService.success('تم حفظ التعديلات بنجاح');
          this.editForm?.reset(this.user);
        },
        error: (error) => {
          this.alertService.error(error);
        },
      });
  }
}
