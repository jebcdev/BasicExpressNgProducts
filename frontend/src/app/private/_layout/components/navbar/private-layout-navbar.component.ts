import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@env/environment';
import { iMenuItem } from '@shared/interfaces/menu-item.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'private-layout-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './private-layout-navbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutNavbarComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  appName = computed<string>(() => environment.appName);

  public authStatus = computed(() => this._authService.authStatus());
  public userName = computed(() => this._authService.user()?.name);
  public isAdmin = computed(() => {
    if (this._authService.user()?.role?.id === 1) return true;
    return false;
  });

  menuItems = signal<iMenuItem[]>([
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/private/profile', label: 'Perfíl', icon: 'fas fa-cogs' },
  ]);

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}

export default PrivateLayoutNavbarComponent;
