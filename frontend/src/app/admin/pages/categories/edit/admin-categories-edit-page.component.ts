import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AdminCategoriesFormComponent } from '../components/form/admin-categories-form.component';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-categories-edit-page',
  imports: [AdminCategoriesFormComponent, RouterLink],
  templateUrl: './admin-categories-edit-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesEditPageComponent {
  categoryId = input.required<number>();
}
export default AdminCategoriesEditPageComponent;
