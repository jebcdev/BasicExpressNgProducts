import { CategoriesService } from '@admin/services/categories.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';
import { AdminCategoriesTableComponent } from './components/table/admin-categories-table.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-categories-page',
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
    AdminCategoriesTableComponent,
  ],
  templateUrl: './admin-categories-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesPageComponent {
  private _categoriesService: CategoriesService = inject(CategoriesService);

  categoriesResource = rxResource({
    loader: () => this._categoriesService.getAll(),
  });
}

export default AdminCategoriesPageComponent;
