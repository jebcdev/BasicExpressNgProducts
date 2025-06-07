import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminProductsFormComponent } from '../index';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-products-create-page',
  imports: [AdminProductsFormComponent, RouterLink],
  templateUrl: './admin-products-create-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsCreatePageComponent {}

export default AdminProductsCreatePageComponent;
