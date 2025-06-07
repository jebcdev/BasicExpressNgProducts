import { eProductStatus } from '@admin/enums';

export const getStatusLabel = (status: eProductStatus): string => {
  switch (status) {
    case eProductStatus.DRAFT:
      return 'Borrador';
    case eProductStatus.PUBLISHED:
      return 'Publicado';
    case eProductStatus.ARCHIVED:
      return 'Archivado';
    default:
      return status;
  }
};
