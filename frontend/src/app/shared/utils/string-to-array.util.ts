// Método auxiliar para convertir string a array
export const convertStringToArray = (value: string | string[]): string[] => {
  // Si ya es un array, devolverlo tal como está
  if (Array.isArray(value)) {
    return value;
  }

  // Si es string vacío o null/undefined, devolver array vacío
  if (!value || typeof value !== 'string') {
    return [];
  }

  // Dividir por comas, eliminar espacios en blanco y filtrar elementos vacíos
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};
