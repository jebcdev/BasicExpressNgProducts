import { RolesService } from '@admin/services/roles.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';
import { AdminRolesTableComponent } from './components';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-roles-page',
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
    AdminRolesTableComponent,
  ],
  templateUrl: './admin-roles-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRolesPageComponent {
  private _rolesService: RolesService = inject(RolesService);

  rolesResource = rxResource({
    loader: () => this._rolesService.getAll(),
  });
}

export default AdminRolesPageComponent;
