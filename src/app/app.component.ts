import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AuthService } from '@services/auth/auth.service';
import { NavigationService } from '@services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzBadgeModule,
    NzPopoverModule,
    NzButtonModule,
    NzCollapseModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notifications: any[] = [];
  user?: any;
  #auth = inject(AuthService);
  router = inject(NavigationService);
  isCollapsed: boolean = false;

  constructor() {
    this.#auth.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  async logout() {
    await this.#auth.logout();
    this.router.push('/login');
  }

  resetPassword() {}

  goToNotifications() {}
}
