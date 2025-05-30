import { iBrand } from '@admin/interfaces';
import { ColumnDef, FilterFn, Row } from '@tanstack/angular-table';

const customFilterFn: FilterFn<iBrand> = (
  row: Row<iBrand>,
  columnId,
  filterValue: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  addMeta: (meta: any) => void,
): boolean => {
  try {
    filterValue = filterValue.toLowerCase();
    const rowValues = Object.values(row.original)
      .map((value) => value)
      .join(' ')
      .toLowerCase();
    return rowValues.includes(filterValue);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const brandsTableColumns: ColumnDef<iBrand>[] = [
  {
    id: 'id',
    accessorFn: (row) => row.id,
    cell: (info) => info.getValue(),
    header: 'ID',
    filterFn: customFilterFn,
  },
  {
    id: 'name',
    accessorFn: (row) => row.name,
    cell: (info) => info.getValue(),
    header: 'Nombre',
    filterFn: customFilterFn,
  },
  {
    id: 'slug',
    accessorFn: (row) => row.slug,
    cell: (info) => info.getValue(),
    header: 'Slug',
    filterFn: customFilterFn,
  },
  {
    id: 'image',
    accessorFn: (row) => row.image,
    cell: (info) => info.getValue(),
    header: 'Imagen',
    filterFn: customFilterFn,
  },
  {
    id: 'actions',
    header: 'Acciones',
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
];

export default brandsTableColumns;
