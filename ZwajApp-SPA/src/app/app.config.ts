import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './_services/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';

// دالة لجلب التوكن من الـ LocalStorage أوتوماتيك
export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    {
      // 1. تسجيل الـ ErrorInterceptor للتعامل مع الأخطاء
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },

    // 2. تسجيل الـ JwtModule عشان يرفق التوكن مع الطلبات تلقائياً
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:5082'], // استبدله بدومين الباك اند عندك لو مختلف
          disallowedRoutes: ['localhost:5082/auth'], // المسارات المستثناة (زي تسجيل الدخول)
        },
      }),
    ),
  ],
};
