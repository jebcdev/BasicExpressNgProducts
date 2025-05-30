import { iProduct } from '@admin/interfaces';
import { ColumnDef, FilterFn, Row } from '@tanstack/angular-table';

const customFilterFn: FilterFn<iProduct> = (
  row: Row<iProduct>,
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

export const productsTableColumns: ColumnDef<iProduct>[] = [
  {
    id: 'id',
    accessorFn: (row) => row.id,
    cell: (info) => info.getValue(),
    header: 'ID',
    filterFn: customFilterFn,
    size: 80,
  },
  {
    id: 'code',
    accessorFn: (row) => row.code,
    cell: (info) => info.getValue(),
    header: 'Código',
    filterFn: customFilterFn,
    size: 120,
  },
  {
    id: 'name',
    accessorFn: (row) => row.name,
    cell: (info) => info.getValue(),
    header: 'Nombre',
    filterFn: customFilterFn,
    size: 200,
  },
  {
    id: 'sku',
    accessorFn: (row) => row.sku,
    cell: (info) => info.getValue(),
    header: 'SKU',
    filterFn: customFilterFn,
    size: 120,
  },
  {
    id: 'category',
    accessorFn: (row) => row.category?.name,
    cell: (info) => info.getValue() || 'Sin categoría',
    header: 'Categoría',
    filterFn: customFilterFn,
    size: 150,
  },
  {
    id: 'brand',
    accessorFn: (row) => row.brand?.name,
    cell: (info) => info.getValue() || 'Sin marca',
    header: 'Marca',
    filterFn: customFilterFn,
    size: 150,
  },
  {
    id: 'price',
    accessorFn: (row) => row.price,
    cell: (info) => {
      const price = info.getValue() as string;
      return `$${parseFloat(price).toFixed(2)}`;
    },
    header: 'Precio',
    filterFn: customFilterFn,
    size: 120,
  },
  {
    id: 'sale_price',
    accessorFn: (row) => row.sale_price,
    cell: (info) => {
      const salePrice = info.getValue() as string;
      return salePrice ? `$${parseFloat(salePrice).toFixed(2)}` : '-';
    },
    header: 'Precio Oferta',
    filterFn: customFilterFn,
    size: 130,
  },
  {
    id: 'stock_quantity',
    accessorFn: (row) => row.stock_quantity,
    cell: (info) => {
      const stock = info.getValue() as number;
      const stockClass =
        stock > 10
          ? 'text-green-600'
          : stock > 0
            ? 'text-yellow-600'
            : 'text-red-600';
      return `<span class="${stockClass}">${stock}</span>`;
    },
    header: 'Stock',
    filterFn: customFilterFn,
    size: 100,
  },
  {
    id: 'featured',
    accessorFn: (row) => row.featured,
    cell: (info) => {
      const featured = info.getValue() as boolean;
      return featured ? '⭐ Destacado' : 'Normal';
    },
    header: 'Destacado',
    filterFn: customFilterFn,
    size: 120,
  },
  {
    id: 'status',
    accessorFn: (row) => row.status,
    cell: (info) => {
      const status = info.getValue() as string;
      const statusClass =
        status === 'active' ? 'text-green-600' : 'text-red-600';
      const statusText = status === 'active' ? 'Activo' : 'Inactivo';
      return `<span class="${statusClass}">${statusText}</span>`;
    },
    header: 'Estado',
    filterFn: customFilterFn,
    size: 100,
  },
  {
    id: 'images',
    accessorFn: (row) => row.images,
    cell: (info) => {
      const images = info.getValue() as string[];
      return images && images.length > 0
        ? `${images.length} imagen(es)`
        : 'Sin imagen';
    },
    header: 'Imágenes',
    enableSorting: false,
    enableColumnFilter: false,
    size: 120,
  },

  {
    id: 'actions',
    header: 'Acciones',
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    size: 120,
  },
];

export default productsTableColumns;
