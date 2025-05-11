import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AdminUsersFormComponent } from '../components/form/admin-users-form.component';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-users-edit-page',
  imports: [AdminUsersFormComponent, RouterLink],
  templateUrl: './admin-users-edit-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersEditPageComponent {
  userId = input.required<number>();
}

export default AdminUsersEditPageComponent;
