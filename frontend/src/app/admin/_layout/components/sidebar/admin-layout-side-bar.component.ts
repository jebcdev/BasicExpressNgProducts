import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { iMenuItem } from '@shared/interfaces';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-layout-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-layout-side-bar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutSideBarComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  menuItems = signal<iMenuItem[]>([
    { path: '/admin', title: 'Dashboard', icon: 'fab fa-dashcube' },
    { path: '/admin/roles', title: 'Roles', icon: 'fas fa-user-tag' },
    { path: '/admin/users', title: 'Usuarios', icon: 'fas fa-users' },
    { path: '/admin/categories', title: 'Categorias', icon: 'fas fa-tags' },
    { path: '/admin/brands', title: 'Marcas', icon: 'fas fa-trademark' },
    { path: '/admin/products', title: 'Productos', icon: 'fas fa-boxes' },
  ]);

  logout(): void {
    try {
      if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        this._authService.logout();
        this._router.navigate(['/auth/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default AdminLayoutSideBarComponent;
