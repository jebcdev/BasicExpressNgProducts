import { ProductsService } from '@admin/services';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';
import AdminProductsTableComponent from './components/table/admin-products-table.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-products-page',
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
    AdminProductsTableComponent,
  ],
  templateUrl: './admin-products-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsPageComponent {
  private _productsService: ProductsService = inject(ProductsService);

  productsRs = rxResource({
    loader: () => this._productsService.getAll(),
  });
}

export default AdminProductsPageComponent;
