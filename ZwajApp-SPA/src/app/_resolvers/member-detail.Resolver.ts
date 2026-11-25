import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

export const MemberDetailResolver: ResolveFn<User | null> = (route) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const alertify = inject(AlertifyService);

  const id = Number(route.paramMap.get('id'));

  return userService.getUser(id).pipe(
    catchError(() => {
      alertify.error('يوجد مشكلة في عرض البيانات');
      router.navigate(['/members']);
      return of(null);
    }),
  );
};
