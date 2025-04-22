import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { iRole } from '@auth/interfaces';
import rolesTableColumns from './roles-table-columns.definition';
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
import { toast } from 'ngx-sonner';
import { RolesService } from '@admin/services/roles.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-roles-table',
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './admin-roles-table.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRolesTableComponent {
  //
  private _rolesService: RolesService = inject(RolesService);
  private _router: Router = inject(Router);
  roles = input.required<iRole[]>();

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
    data: this.roles(),
    getCoreRowModel: getCoreRowModel(),
    columns: rolesTableColumns,
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

  onSort(col: Column<iRole>) {
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

  onEdit(row: Row<iRole>) {
    try {
      if (this._rolesService.forbidenRoles().includes(row.original.id)) {
        toast.error('Éste Rol, No Puede ser Editado', {
          description: 'Este rol es un rol de sistema y no puede ser editado',
        });
        return;
      }
      this._router.navigate(['admin/roles/edit', row.original.id]);
    } catch (error) {
      console.error(error);
      toast.error('Error al Editar el Rol', {
        description: 'Error al Editar el Rol, por favor intente de nuevo',
      });
    }
  }

  onDelete(row: Row<iRole>) {
    try {
      if (this._rolesService.forbidenRoles().includes(row.original.id)) {
        toast.error('Éste Rol, No Puede ser Eliminado', {
          description: 'Este rol es un rol de sistema y no puede ser eliminado',
        });
        return;
      }
      if (confirm('¿Está Seguro de Eliminar Éste Registro?')) {
        this._rolesService
          .deleteById(row.original.id)
          .pipe(tap(() => this._rolesService.getAll().subscribe()))
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

      toast.error('Error al Eliminar el Rol', {
        description: 'Error al Eliminar el Rol, por favor intente de nuevo',
      });
    }
  }
}

export default AdminRolesTableComponent;
