import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminRolesFormComponent } from '../components/form/admin-roles-form.component';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-roles-create-page',
  imports: [RouterLink, AdminRolesFormComponent],
  templateUrl: './admin-roles-create-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRolesCreatePageComponent {}

export default AdminRolesCreatePageComponent;
