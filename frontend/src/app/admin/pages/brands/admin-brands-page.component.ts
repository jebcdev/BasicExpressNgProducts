import { BrandsService } from '@admin/services';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';
import { AdminBrandsTableComponent } from './components/table/admin-brands-table.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-brands-page',
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
    AdminBrandsTableComponent,
  ],
  templateUrl: './admin-brands-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBrandsPageComponent {
  private _brandsService: BrandsService = inject(BrandsService);

  brandsResource = rxResource({
    loader: () => this._brandsService.getAll(),
  });
}

export default AdminBrandsPageComponent;
