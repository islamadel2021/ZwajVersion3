import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

export const MemberListResolver: ResolveFn<User[] | null> = (): Observable<
  User[] | null
> => {
  const userService = inject(UserService);
  const router = inject(Router);
  const alertService = inject(AlertifyService);

  return userService.getUsers().pipe(
    catchError(() => {
      alertService.error('يوجد مشكلة في عرض البيانات');
      router.navigate(['/members']);
      return of(null);
    }),
  );
};
