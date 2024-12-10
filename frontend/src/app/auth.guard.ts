import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const isLoggedIn = !!localStorage.getItem('user');

    // If user is logged in and trying to access login, redirect to home
    if (route.routeConfig?.path === 'login' && isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    // If accessing protected routes like home, ensure they are logged in
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
