import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('user'); // Check session
    const currentRoute = route.routeConfig?.path; // Get the current route
    console.log('AuthGuard: Current Route:', currentRoute, 'Logged In:', isLoggedIn);

    // If logged in and trying to access the login page, redirect to home
    if (currentRoute === 'login' && isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    // For protected routes, redirect to login if not logged in
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true; // Allow navigation
  }
}
