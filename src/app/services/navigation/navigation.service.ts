import { Injectable, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);
  private location = inject(Location);

  push(route: string, extras?: NavigationExtras): void {
    this.router.navigate([route], extras);
  }

  replace(route: string, extras?: NavigationExtras): void {
    this.router.navigate([route], { ...extras, replaceUrl: true });
  }

  pop(): void {
    this.location.back();
  }

  canGoBack(): boolean {
    return this.router.config.length > 1;
  }
}
