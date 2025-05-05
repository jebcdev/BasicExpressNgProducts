export const generateSlug = (value: string): string => {
    return value
        .toLowerCase()
        .normalize("NFKD") // Normaliza caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Elimina marcas diacríticas
        .replace(/\s+/g, "-") // Reemplaza espacios por guiones
        .replace(/[^\w\-]+/g, "") // Elimina caracteres no alfanuméricos
        .replace(/\-\-+/g, "-") // Reemplaza múltiples guiones por uno solo
        .replace(/^-+/, "") // Elimina guiones al inicio
        .replace(/-+$/, ""); // Elimina guiones al final
};
