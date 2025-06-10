// Importa los tipos Request y Response de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express";

// Importa la clase Repository de TypeORM para interactuar con la base de datos.
import { Repository } from "typeorm";

// Importa la entidad RoleEntity, que representa la tabla de roles en la base de datos.
import { RoleEntity } from "../../role/entities/role.entity";

// Importa la entidad UserEntity, que representa la tabla de usuarios en la base de datos.
import { UserEntity } from "../../user/entities/user.entity";

// Importa la clase DatabaseConnection para obtener la conexión con la base de datos.
import { DatabaseConnection } from "../../database/DatabaseConnection";

// Importa la utilidad BcryptUtil para hashear contraseñas de forma segura.
import { BcryptUtil } from "../../../utils/bcrypt.util";

// Importa la función plainToClass para convertir objetos planos en instancias de clases.
import { plainToClass } from "class-transformer";
import { CategoryEntity } from "../../dashboard/categories/entities/category.entity";
import { BrandEntity } from "../../dashboard/brands/entities/brand.entity";
import { ProductEntity } from "../../dashboard/products/entities/product.entity";
import { ProductStatus } from "../../dashboard/products/entities/product.entity";

// Define la clase SeederController que se encargará de crear roles y usuarios de prueba en la base de datos.
export class SeederController {
    // Define dos repositorios privados para interactuar con las tablas de roles y usuarios.
    private roleRepository: Repository<RoleEntity>;
    private userRepository: Repository<UserEntity>;
    private categoryRepository: Repository<CategoryEntity>; // Repositorio para la entidad CategoryEntity.
    private brandRepository: Repository<BrandEntity>; // Repositorio para la entidad BrandEntity.
    private productRepository: Repository<ProductEntity>; // Repositorio para la entidad ProductEntity.

    // Constructor de la clase que inicializa los repositorios utilizando la conexión a la base de datos.
    constructor() {
        this.roleRepository =
            DatabaseConnection.appDataSource.getRepository(
                RoleEntity // Obtiene el repositorio para la entidad RoleEntity.
            );

        this.userRepository =
            DatabaseConnection.appDataSource.getRepository(
                UserEntity // Obtiene el repositorio para la entidad UserEntity.
            );

        this.categoryRepository =
            DatabaseConnection.appDataSource.getRepository(
                CategoryEntity // Obtiene el repositorio para la entidad CategoryEntity.
            );

        this.brandRepository =
            DatabaseConnection.appDataSource.getRepository(
                BrandEntity // Obtiene el repositorio para la entidad BrandEntity.
            );

        this.productRepository =
            DatabaseConnection.appDataSource.getRepository(
                ProductEntity // Obtiene el repositorio para la entidad ProductEntity.
            );
    }

    // Método público asincrónico que siembra roles y usuarios en la base de datos.
    public async seedRolesUsers(
        _: Request, // No se usa la solicitud (por eso el guion bajo).
        res: Response // Respuesta HTTP que se enviará al cliente.
    ): Promise<Response> {
        try {
            /* Admin Seed */
            // Crea y guarda un rol de administrador en la base de datos.
            const adminRole = await this.roleRepository.save(
                plainToClass(RoleEntity, {
                    // Convierte un objeto plano en una instancia de RoleEntity.
                    name: "admin", // Nombre del rol.
                    description: "Admin Role", // Descripción del rol.
                })
            );

            // Crea y guarda un usuario administrador asociado al rol creado anteriormente.
            const adminUser = await this.userRepository.save(
                plainToClass(UserEntity, {
                    // Convierte un objeto plano en una instancia de UserEntity.
                    name: "Administrator", // Nombre del usuario.
                    surname: "System", // Apellido del usuario.
                    email: "admin@admin.com", // Correo electrónico del usuario.
                    password: await BcryptUtil.hashPassword(
                        "12345678" // Hashea la contraseña antes de guardarla en la base de datos.
                    ),
                    role_id: adminRole.id, // Asocia el usuario con el rol de administrador.
                })
            );
            /* Admin Seed */

            /* User Seed */
            // Crea y guarda un rol de usuario estándar en la base de datos.
            const userRole = await this.roleRepository.save(
                plainToClass(RoleEntity, {
                    name: "user", // Nombre del rol.
                    description: "User Role", // Descripción del rol.
                })
            );

            // Crea y guarda un usuario estándar asociado al rol de usuario.
            const userUser = await this.userRepository.save(
                plainToClass(UserEntity, {
                    name: "User", // Nombre del usuario.
                    surname: "System", // Apellido del usuario.
                    email: "user@user.com", // Correo electrónico del usuario.
                    password: await BcryptUtil.hashPassword(
                        "12345678" // Hashea la contraseña del usuario.
                    ),
                    role_id: userRole.id, // Asocia el usuario con el rol de usuario.
                })
            );
            /* User Seed */

            /* Guest Seed */
            // Crea y guarda un rol de invitado en la base de datos.
            const guestRole = await this.roleRepository.save(
                plainToClass(RoleEntity, {
                    name: "guest", // Nombre del rol.
                    description: "Guest Role", // Descripción del rol.
                })
            );

            // Crea y guarda un usuario invitado asociado al rol de invitado.
            const guestUser = await this.userRepository.save(
                plainToClass(UserEntity, {
                    name: "Guest", // Nombre del usuario.
                    surname: "System", // Apellido del usuario.
                    email: "guest@guest.com", // Correo electrónico del usuario.
                    password: await BcryptUtil.hashPassword(
                        "12345678" // Hashea la contraseña del usuario.
                    ),
                    role_id: guestRole.id, // Asocia el usuario con el rol de invitado.
                })
            );
            /* Guest Seed */

            // Devuelve una respuesta HTTP 200 con un mensaje de éxito y los datos de los roles y usuarios creados.
            return res.status(200).json({
                adminRole,
                adminUser,
                userRole,
                userUser,
                guestRole,
                guestUser,
            });
        } catch (error) {
            // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
            return res.status(500).json({
                message: "Error Seeding Roles and Users", // Mensaje de error.
                data: error, // Información detallada del error.
            });
        }
    }

    // Método público asincrónico que siembra categorías en la base de datos.
    public async seedCategories(
        _: Request, // No se usa la solicitud (por eso el guion bajo).
        res: Response // Respuesta HTTP que se enviará al cliente.
    ): Promise<Response> {
        try {
            // Crea y guarda una categoría de ejemplo en la base de datos.
            const category1 = await this.categoryRepository.save(
                plainToClass(CategoryEntity, {
                    name: "Electronics", // Nombre de la categoría.
                    slug: "electronics", // Slug único para la categoría.
                    description: "Category for electronic products", // Descripción de la categoría.
                    image: "electronics.jpg", // Imagen asociada a la categoría.
                })
            );

            const category2 = await this.categoryRepository.save(
                plainToClass(CategoryEntity, {
                    name: "Books", // Nombre de la categoría.
                    slug: "books", // Slug único para la categoría.
                    description: "Category for books and literature", // Descripción de la categoría.
                    image: "books.jpg", // Imagen asociada a la categoría.
                })
            );

            const category3 = await this.categoryRepository.save(
                plainToClass(CategoryEntity, {
                    name: "Clothing", // Nombre de la categoría.
                    slug: "clothing", // Slug único para la categoría.
                    description: "Category for clothing and apparel", // Descripción de la categoría.
                    image: "clothing.jpg", // Imagen asociada a la categoría.
                })
            );

            // Devuelve una respuesta HTTP 200 con un mensaje de éxito y los datos de las categorías creadas.
            return res.status(200).json({
                message: "Categories seeded successfully",
                categories: [category1, category2, category3],
            });
        } catch (error: any) {
            // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
            console.log(error);
            return res.status(500).json({
                message: "Error Seeding Categories",
                data: error,
            });
        }
    }

    // Método público asincrónico que siembra marcas en la base de datos.
    public async seedBrands(
        _: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Creamos varias marcas de computadores conocidas.
            const brand1 = await this.brandRepository.save(
                plainToClass(BrandEntity, {
                    name: "Apple",
                    slug: "apple",
                    description:
                        "Manufacturer of MacBooks and other electronics",
                    image: "apple-logo.png",
                })
            );

            const brand2 = await this.brandRepository.save(
                plainToClass(BrandEntity, {
                    name: "Dell",
                    slug: "dell",
                    description: "Known for XPS and Inspiron laptops",
                    image: "dell-logo.png",
                })
            );

            const brand3 = await this.brandRepository.save(
                plainToClass(BrandEntity, {
                    name: "Lenovo",
                    slug: "lenovo",
                    description:
                        "Popular for ThinkPad and IdeaPad series",
                    image: "lenovo-logo.png",
                })
            );

            const brand4 = await this.brandRepository.save(
                plainToClass(BrandEntity, {
                    name: "HP",
                    slug: "hp",
                    description:
                        "Offers Pavilion, Envy and Spectre laptops",
                    image: "hp-logo.png",
                })
            );

            const brand5 = await this.brandRepository.save(
                plainToClass(BrandEntity, {
                    name: "Asus",
                    slug: "asus",
                    description: "Known for ROG and ZenBook laptops",
                    image: "asus-logo.png",
                })
            );

            return res.status(200).json({
                message: "Brands seeded successfully",
                brands: [brand1, brand2, brand3, brand4, brand5],
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                message: "Error Seeding Brands",
                data: error,
            });
        }
    }

      // Método público asincrónico que siembra productos en la base de datos.
    public async seedProducts(
        _: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Producto 1 - MacBook Pro
            const product1 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "MBP-001",
                    name: "MacBook Pro 13 inch",
                    slug: "macbook-pro-13-inch",
                    description: "Powerful MacBook Pro with M2 chip, perfect for professional work and creative tasks.",
                    short_description: "MacBook Pro 13'' with M2 chip",
                    images: ["macbook-pro-1.jpg", "macbook-pro-2.jpg"],
                    price: 1299.00,
                    sale_price: 1199.00,
                    cost_price: 900.00,
                    stock_quantity: 25,
                    sku: "APPLE-MBP-13-M2",
                    barcode: "0194252056394",
                    featured: true,
                    status: ProductStatus.PUBLISHED,
                    category_id: 1, // Electronics
                    brand_id: 1, // Apple
                    tags: ["laptop", "apple", "macbook", "professional"],
                    attributes: ["13 inch", "M2 chip", "8GB RAM", "256GB SSD"]
                })
            );

            // Producto 2 - Dell XPS 13
            const product2 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "DELL-002",
                    name: "Dell XPS 13 Laptop",
                    slug: "dell-xps-13-laptop",
                    description: "Ultra-thin and light laptop with stunning InfinityEdge display and powerful performance.",
                    short_description: "Dell XPS 13 with InfinityEdge display",
                    images: ["dell-xps-1.jpg", "dell-xps-2.jpg"],
                    price: 999.00,
                    sale_price: 899.00,
                    cost_price: 650.00,
                    stock_quantity: 30,
                    sku: "DELL-XPS-13-2023",
                    barcode: "0884116365729",
                    featured: true,
                    status: ProductStatus.PUBLISHED,
                    category_id: 1, // Electronics
                    brand_id: 2, // Dell
                    tags: ["laptop", "dell", "xps", "ultrabook"],
                    attributes: ["13.4 inch", "Intel i7", "16GB RAM", "512GB SSD"]
                })
            );

            // Producto 3 - Lenovo ThinkPad
            const product3 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "LEN-003",
                    name: "Lenovo ThinkPad X1 Carbon",
                    slug: "lenovo-thinkpad-x1-carbon",
                    description: "Business laptop with legendary ThinkPad reliability and carbon fiber construction.",
                    short_description: "ThinkPad X1 Carbon business laptop",
                    images: ["thinkpad-1.jpg", "thinkpad-2.jpg"],
                    price: 1599.00,
                    sale_price: null,
                    cost_price: 1100.00,
                    stock_quantity: 15,
                    sku: "LEN-X1C-GEN10",
                    barcode: "0196118644889",
                    featured: false,
                    status: ProductStatus.PUBLISHED,
                    category_id: 1, // Electronics
                    brand_id: 3, // Lenovo
                    tags: ["laptop", "lenovo", "thinkpad", "business"],
                    attributes: ["14 inch", "Intel i7", "16GB RAM", "1TB SSD"]
                })
            );

            // Producto 4 - HP Pavilion
            const product4 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "HP-004",
                    name: "HP Pavilion 15 Laptop",
                    slug: "hp-pavilion-15-laptop",
                    description: "Versatile laptop for everyday computing with reliable performance and sleek design.",
                    short_description: "HP Pavilion 15 for everyday use",
                    images: ["hp-pavilion-1.jpg", "hp-pavilion-2.jpg"],
                    price: 649.00,
                    sale_price: 599.00,
                    cost_price: 450.00,
                    stock_quantity: 40,
                    sku: "HP-PAV-15-2023",
                    barcode: "0195161748394",
                    featured: false,
                    status: ProductStatus.PUBLISHED,
                    category_id: 1, // Electronics
                    brand_id: 4, // HP
                    tags: ["laptop", "hp", "pavilion", "everyday"],
                    attributes: ["15.6 inch", "AMD Ryzen 5", "8GB RAM", "256GB SSD"]
                })
            );

            // Producto 5 - ASUS ROG
            const product5 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "ASUS-005",
                    name: "ASUS ROG Strix G15 Gaming Laptop",
                    slug: "asus-rog-strix-g15-gaming",
                    description: "High-performance gaming laptop with RGB lighting and powerful graphics for immersive gaming.",
                    short_description: "ASUS ROG Strix G15 gaming laptop",
                    images: ["asus-rog-1.jpg", "asus-rog-2.jpg"],
                    price: 1199.00,
                    sale_price: 1099.00,
                    cost_price: 800.00,
                    stock_quantity: 20,
                    sku: "ASUS-ROG-G15-2023",
                    barcode: "0195553442846",
                    featured: true,
                    status: ProductStatus.PUBLISHED,
                    category_id: 1, // Electronics
                    brand_id: 5, // Asus
                    tags: ["laptop", "asus", "rog", "gaming"],
                    attributes: ["15.6 inch", "AMD Ryzen 7", "16GB RAM", "1TB SSD", "RTX 3060"]
                })
            );

            // Producto 6 - Programming Book
            const product6 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "BOOK-006",
                    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
                    slug: "clean-code-handbook",
                    description: "Essential reading for any developer who wants to improve their code quality and maintainability.",
                    short_description: "Clean Code programming book",
                    images: ["clean-code-book.jpg"],
                    price: 42.99,
                    sale_price: 35.99,
                    cost_price: 20.00,
                    stock_quantity: 100,
                    sku: "BOOK-CLEAN-CODE",
                    barcode: "9780132350884",
                    featured: false,
                    status: ProductStatus.PUBLISHED,
                    category_id: 2, // Books
                    brand_id: 1, // Usando Apple como placeholder para publisher
                    tags: ["book", "programming", "software", "development"],
                    attributes: ["Paperback", "464 pages", "English", "Robert C. Martin"]
                })
            );

            // Producto 7 - JavaScript Book
            const product7 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "BOOK-007",
                    name: "You Don't Know JS: Scope & Closures",
                    slug: "you-dont-know-js-scope-closures",
                    description: "Deep dive into JavaScript's scope and closures concepts for better understanding of the language.",
                    short_description: "JavaScript Scope & Closures book",
                    images: ["ydkjs-book.jpg"],
                    price: 29.99,
                    sale_price: null,
                    cost_price: 15.00,
                    stock_quantity: 75,
                    sku: "BOOK-YDKJS-SC",
                    barcode: "9781449335588",
                    featured: false,
                    status: ProductStatus.PUBLISHED,
                    category_id: 2, // Books
                    brand_id: 2, // Usando Dell como placeholder para publisher
                    tags: ["book", "javascript", "programming", "web"],
                    attributes: ["Paperback", "98 pages", "English", "Kyle Simpson"]
                })
            );

            // Producto 8 - T-Shirt
            const product8 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "CLOTH-008",
                    name: "Developer T-Shirt - Code Never Lies",
                    slug: "developer-tshirt-code-never-lies",
                    description: "Comfortable cotton t-shirt with funny programming quote, perfect for developers.",
                    short_description: "Developer themed t-shirt",
                    images: ["dev-tshirt-1.jpg", "dev-tshirt-2.jpg"],
                    price: 24.99,
                    sale_price: 19.99,
                    cost_price: 10.00,
                    stock_quantity: 50,
                    sku: "CLOTH-TSHIRT-DEV",
                    barcode: "1234567890123",
                    featured: false,
                    status: ProductStatus.PUBLISHED,
                    category_id: 3, // Clothing
                    brand_id: 3, // Usando Lenovo como placeholder para brand
                    tags: ["clothing", "tshirt", "developer", "cotton"],
                    attributes: ["100% Cotton", "Multiple sizes", "Black", "Unisex"]
                })
            );

            // Producto 9 - Draft Product
            const product9 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "DRAFT-009",
                    name: "Product in Development",
                    slug: "product-in-development",
                    description: "This product is still in development phase and will be available soon.",
                    short_description: "Product in development",
                    images: ["placeholder.jpg"],
                    price: 0.00,
                    sale_price: null,
                    cost_price: 0.00,
                    stock_quantity: 0,
                    sku: "DRAFT-PRODUCT",
                    barcode: "0000000000000",
                    featured: false,
                    status: ProductStatus.DRAFT,
                    category_id: 1, // Electronics
                    brand_id: 1, // Apple
                    tags: ["draft", "development"],
                    attributes: ["Coming soon"]
                })
            );

            // Producto 10 - Archived Product
            const product10 = await this.productRepository.save(
                plainToClass(ProductEntity, {
                    code: "ARCH-010",
                    name: "Discontinued Laptop Model",
                    slug: "discontinued-laptop-model",
                    description: "This laptop model has been discontinued and is no longer available for purchase.",
                    short_description: "Discontinued laptop",
                    images: ["old-laptop.jpg"],
                    price: 599.00,
                    sale_price: null,
                    cost_price: 400.00,
                    stock_quantity: 0,
                    sku: "ARCH-LAPTOP-OLD",
                    barcode: "9999999999999",
                    featured: false,
                    status: ProductStatus.ARCHIVED,
                    category_id: 1, // Electronics
                    brand_id: 4, // HP
                    tags: ["laptop", "discontinued", "archived"],
                    attributes: ["Discontinued", "No longer available"]
                })
            );

            return res.status(200).json({
                message: "Products seeded successfully",
                products: [
                    product1, product2, product3, product4, product5,
                    product6, product7, product8, product9, product10
                ],
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                message: "Error Seeding Products",
                data: error,
            });
        }
    }
}
