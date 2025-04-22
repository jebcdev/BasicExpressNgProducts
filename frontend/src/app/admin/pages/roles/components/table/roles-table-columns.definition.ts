import { iRole } from '@auth/interfaces';
import { ColumnDef, FilterFn, Row } from '@tanstack/angular-table';

const customFilterFn: FilterFn<iRole> = (
  row: Row<iRole>,
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

export const rolesTableColumns: ColumnDef<iRole>[] = [
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
    id: 'description',
    accessorFn: (row) => row.description,
    cell: (info) => info.getValue(),
    header: 'Descripción',
    filterFn: customFilterFn,
  },
  {
    id: 'users',
    accessorFn: (row) => row.users?.length,
    cell: (info) => info.getValue(),
    header: '# Usuarios',
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

export default rolesTableColumns;
