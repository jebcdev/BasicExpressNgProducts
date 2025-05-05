import { CategoriesService } from '@admin/services/categories.service';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { iCategory } from '@auth/interfaces';
import {
  Column,
  ColumnFiltersState,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from '@tanstack/angular-table';
import categoriesTableColumns from './categories-table-columns.definition';
import { toast } from 'ngx-sonner';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { environment } from '@env/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-categories-table',
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './admin-categories-table.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesTableComponent {
  //
  private _categoriesService: CategoriesService = inject(CategoriesService);
  private _router: Router = inject(Router);
  categories = input.required<iCategory[]>();
  public readonly backendUrl = environment.backendUrl;

  /*  */

  private readonly _pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  public readonly sizesPages = signal<number[]>([1, 3, 5, 10, 20]); // This is the page size that will be passed to the table
  private readonly _sortingState = signal<SortingState>([]); // This is the sorting state that will be passed to the table
  private readonly _columnVisibility = signal<VisibilityState>({}); // This is the column visibility state that will be passed to the table
  private readonly _columnFilter = signal<ColumnFiltersState>([]); // This is the column filter state that will be passed to the table

  public table = createAngularTable(() => ({
    data: this.categories(),
    getCoreRowModel: getCoreRowModel(),
    columns: categoriesTableColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      pagination: this._pagination(),
      sorting: this._sortingState(),
      columnVisibility: this._columnVisibility(),
      columnFilters: this._columnFilter(),
    },
    onPaginationChange: (valueOrFunction) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      typeof valueOrFunction === 'function'
        ? this._pagination.update(valueOrFunction)
        : this._pagination.set(valueOrFunction);
    },
    onSortingChange: (valueOrFunction) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      typeof valueOrFunction === 'function'
        ? this._sortingState.update(valueOrFunction)
        : this._sortingState.set(valueOrFunction);
    },
    onColumnVisibilityChange: (valueOrFunction) => {
      const visibilityStatechange =
        valueOrFunction instanceof Function
          ? valueOrFunction(this._columnVisibility())
          : valueOrFunction;
      this._columnVisibility.set(visibilityStatechange);
    },
    onColumnFiltersChange: (filterChange) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      filterChange instanceof Function
        ? this._columnFilter.update(filterChange)
        : this._columnFilter.set(filterChange);
    },
  }));

  /* Metodos */
  onChangePageSize(e: Event) {
    try {
      const element = e.target as HTMLSelectElement;
      this.table.setPageSize(Number(element.value));
    } catch (error) {
      console.error(error);
    }
  }

  onSort(col: Column<iCategory>) {
    try {
      col.toggleSorting(col.getIsSorted() === 'asc');
    } catch (error) {
      console.error(error);
    }
  }

  onSearch(value: string) {
    try {
      const allColumnsIds = this.table
        .getAllColumns()
        .map((col) => col.id)
        .filter((id) => id !== 'select' && id !== 'actions');

      // console.log('allColumns', allColumnsIds);
      allColumnsIds.forEach((colId) => {
        this.table.getColumn(colId)?.setFilterValue(value);
      });
    } catch (error) {
      console.error(error);
    }
  }

  onEdit(row: Row<iCategory>) {
    try {
      if (
        this._categoriesService.forbidenRCategories().includes(row.original.id!)
      ) {
        toast.error('Ésta Categoría, No Puede ser Editada', {
          description:
            'Ésta categoría es una categoría de sistema y no puede ser editada',
        });
        return;
      }
      this._router.navigate(['admin/categories/edit', row.original.id]);
    } catch (error) {
      console.error(error);
      toast.error('Error al Editar el Categoría', {
        description: 'Error al Editar el Categoría, por favor intente de nuevo',
      });
    }
  }

  onDelete(row: Row<iCategory>) {
    try {
      if (
        this._categoriesService.forbidenRCategories().includes(row.original.id!)
      ) {
        toast.error('Ésta Categoría, No Puede ser Eliminada', {
          description:
            'Ésta categoría es una categoría de sistema y no puede ser eliminada',
        });
        return;
      }
      if (confirm('¿Está Seguro de Eliminar Éste Registro?')) {
        this._categoriesService
          .deleteById(row.original.id!)
          .pipe(tap(() => this._categoriesService.getAll().subscribe()))
          .subscribe({
            next: () => {
              toast.success('Registro Eliminado', {
                description: 'El Registro ha sido eliminado correctamente',
              });
              location.reload();
            },
            error: (err) => {
              console.error(err);
              toast.error('Error al Eliminar el Registro', {
                description:
                  'Error al Eliminar el Registro, por favor intente de nuevo',
              });
            },
          });
      }
    } catch (error) {
      console.error(error);

      toast.error('Error al Eliminar el Usuario', {
        description: 'Error al Eliminar el Usuario, por favor intente de nuevo',
      });
    }
  }
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = './assets/images/no-image.png'; // Ruta a tu imagen por defecto
    // Alternativa: usar una URL externa para imagen por defecto
    // imgElement.src = 'https://via.placeholder.com/150?text=Sin+Imagen';
  }
}

export default AdminCategoriesTableComponent;
