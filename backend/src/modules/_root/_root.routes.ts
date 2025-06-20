import { Router } from "express"; // Importa el enrutador de Express
import { RootController } from "./_root.controller"; // Importa el controlador de la raíz
import { RoleRoutes } from "../role/routes/role.routes"; // Importa las rutas de los roles
import { UserRoutes } from "../user/routes/user.routes"; // Importa las rutas de los usuarios
import { AuthRoutes } from "../auth/routes/auth.routes"; // Importa las rutas de autenticación
import { DashboardRoutes } from "../dashboard/dashboard.routes"; // Importa las rutas del dashboard
import { SeederRoutes } from "../seeder/routes/seeder.routes"; // Importa las rutas de seeder
import { TokenExistsMiddleware } from "../../core/middlewares/tokenExists.middleware"; // Importa el middleware para verificar la existencia del token
import { IsAdminMiddleware } from "../../core/middlewares/isAdmin.middleware"; // Importa el middleware para verificar si el usuario es administrador
export class RootRoutes {
    // Propiedad pública para el enrutador
    public readonly router: Router;

    // Propiedades privadas
    private readonly apiPrefix: string;

    // Constructor que inicializa las rutas y controladores
    constructor() {
        this.router = Router(); // Inicializa el enrutador
        this.apiPrefix = process.env.API_PREFIX || "/api/v2"; // Prefijo de la API
        this.initializeRoutes(); // Llama al método para inicializar las rutas
    }

    // Método privado para definir las rutas
    private initializeRoutes(): void {
        // Registrar la ruta raíz usando el prefijo de la API
        this.router.get(
            "/",
            RootController.root.bind(RootController)
        );

        this.router.use("/auth", new AuthRoutes().router); // Registrar las rutas de autenticación

        this.router.use("/seeder", new SeederRoutes().router); // Registrar las rutas de seeder

        this.router.use(
            "/roles",
            TokenExistsMiddleware.check,
            IsAdminMiddleware.check,
            new RoleRoutes().router
        ); // Registrar las rutas de los roles
        this.router.use(
            "/users",
            TokenExistsMiddleware.check, // Verifica si el token existe
            IsAdminMiddleware.check, // Verifica si el usuario es administrador
            new UserRoutes().router
        ); // Registrar las rutas de los usuarios

        this.router.use(
            "/dashboard",
            TokenExistsMiddleware.check,
            IsAdminMiddleware.check,
            new DashboardRoutes().router
        ); // Registrar las rutas del dashboard
    }
}
