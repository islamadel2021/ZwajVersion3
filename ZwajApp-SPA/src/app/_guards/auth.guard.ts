import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertify = inject(AlertifyService);

  if (authService.loggedIn()) {
    return true;
  }

  alertify.error('يجب تسجيل الدخول أولا');
  router.navigate(['']);
  return false;
};
