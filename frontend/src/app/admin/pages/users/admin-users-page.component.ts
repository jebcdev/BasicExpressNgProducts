import { UsersService } from '@admin/services/users.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';
import { AdminUsersTableComponent } from './components/table/admin-users-table.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-users-page',
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
    AdminUsersTableComponent,
  ],
  templateUrl: './admin-users-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersPageComponent {
  private _usersService: UsersService = inject(UsersService);

  usersResource = rxResource({
    loader: () => this._usersService.getAll(),
  });
}

export default AdminUsersPageComponent;
