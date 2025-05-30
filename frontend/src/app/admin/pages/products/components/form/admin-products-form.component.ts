import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-products-form',
  imports: [],
  templateUrl: './admin-products-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsFormComponent {}
export default AdminProductsFormComponent;
