import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@admin/services';
import { environment } from '@env/environment';
import { eProductStatus } from '@admin/enums';
import { getStatusLabel } from '@shared/utils/get-status-label.util';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-products-details',
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
  ],
  templateUrl: './admin-products-details.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsDetailsComponent {
  productId = input.required<string>();

  private _productsService: ProductsService = inject(ProductsService);
  public readonly backendUrl = environment.backendUrl;

  // Computed para convertir string a number
  private productIdNumber = computed(() => parseInt(this.productId(), 10));

  // Resource para cargar los datos del producto
  public productData = rxResource({
    loader: () => {
      const id = this.productIdNumber();
      if (isNaN(id)) {
        throw new Error('ID de producto inválido');
      }
      return this._productsService.getById(id);
    },
  });

  // Métodos de utilidad
  getStatusLabel(status: string): string {
    return getStatusLabel(status as eProductStatus);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'published':
        return 'badge-success';
      case 'draft':
        return 'badge-warning';
      case 'archived':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = './assets/images/no-image.png';
  }

  formatPrice(price: string | number): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  }

  getMainImage(images: string[]): string {
    if (!images || images.length === 0) {
      return './assets/images/no-image.png';
    }
    return `${this.backendUrl}${images[0]}`;
  }
}

export default AdminProductsDetailsComponent;
