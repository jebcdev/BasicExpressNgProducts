import { iUser } from '@auth/interfaces';
import { ColumnDef, FilterFn, Row } from '@tanstack/angular-table';

const customFilterFn: FilterFn<iUser> = (
  row: Row<iUser>,
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

export const usersTableColumns: ColumnDef<iUser>[] = [
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
    id: 'surname',
    accessorFn: (row) => row.surname,
    cell: (info) => info.getValue(),
    header: 'Apellidos',
    filterFn: customFilterFn,
  },
  {
    id: 'email',
    accessorFn: (row) => row.email,
    cell: (info) => info.getValue(),
    header: 'Email',
    filterFn: customFilterFn,
  },
  {
    id: 'role.name',
    accessorFn: (row) => row.role?.name,
    cell: (info) => info.getValue(),
    header: 'Rol',
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

export default usersTableColumns;
