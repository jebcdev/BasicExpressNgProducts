import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AdminRolesFormComponent } from '../components/form/admin-roles-form.component';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-roles-edit-page',
  imports: [RouterLink, AdminRolesFormComponent],
  templateUrl: './admin-roles-edit-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRolesEditPageComponent {
  roleId = input.required<number>();
}

export default AdminRolesEditPageComponent;
