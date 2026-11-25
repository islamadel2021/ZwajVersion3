import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

export const MemberEditResolver: ResolveFn<User | null> = (route) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const alertify = inject(AlertifyService);
  const authService = inject(AuthService);

  const id = Number(authService.decodedToken?.nameid);

  return userService.getUser(id).pipe(
    catchError(() => {
      alertify.error('يوجد مشكلة في عرض البيانات');
      router.navigate(['/members']);
      return of(null);
    }),
  );
};
