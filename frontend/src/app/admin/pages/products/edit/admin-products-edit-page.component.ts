import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AdminProductsFormComponent } from '../components/form/admin-products-form.component';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-products-edit-page',
  imports: [AdminProductsFormComponent, RouterLink],
  templateUrl: './admin-products-edit-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsEditPageComponent {
  productId = input.required<number | null>();
}

export default AdminProductsEditPageComponent;
