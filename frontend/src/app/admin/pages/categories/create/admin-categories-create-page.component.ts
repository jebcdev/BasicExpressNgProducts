import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminCategoriesFormComponent } from '../components/form/admin-categories-form.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-categories-create-page',
  imports: [RouterLink, AdminCategoriesFormComponent],
  templateUrl: './admin-categories-create-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesCreatePageComponent {}

export default AdminCategoriesCreatePageComponent;
