import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express, { Application } from "express";
import { RootRoutes } from "./modules/_root/_root.routes";
import { DatabaseConnection } from "./modules/database/DatabaseConnection";
import path from "path";


export class Server {
    // Propiedades privadas de la clase Server
    private app: Application;
    private port: number;
    private apiPrefix: string;

    // Constructor que inicializa la aplicación
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || "4000", 10) || 4000;
        this.apiPrefix = process.env.API_PREFIX || "/api/v1";
        this.middlewares(); // Llama al método de middlewares
        this.routes(); // Llama al método de rutas
    }

    // Método privado para configurar los middlewares
    private middlewares(): void {
        this.app.use(morgan("dev")); // Logger para las peticiones HTTP
    
        // Configuración de CORS para permitir todo
        this.app.use(cors({ 
            origin: "*", 
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            exposedHeaders: ['Content-Type', 'Authorization'] 
        }));
    
        // Configuración de Helmet para relajar restricciones en desarrollo
        this.app.use(
            helmet({
                contentSecurityPolicy: false, // Desactiva CSP
                crossOriginEmbedderPolicy: false, // Desactiva restricciones de origen cruzado
            })
        );
    
        this.app.use(express.json()); // Analizar el cuerpo de las peticiones en formato JSON
        this.app.use(express.urlencoded({ extended: true })); // Analizar el cuerpo de las peticiones codificado como urlencoded
    
        // Ajusta la ruta para servir archivos estáticos desde dist/public
        this.app.use('/public', express.static(path.join(__dirname, "public")))
        this.app.use('/public/uploads/categories', express.static(path.join(__dirname, "public/uploads/categories")))
        
        ;
    }

    // Método privado para configurar las rutas
    private routes(): void {
        const routes: RootRoutes = new RootRoutes(); // Instancia las rutas del Root
        this.app.use(this.apiPrefix, routes.router); // Usar las rutas definidas
    }
    // Método público para iniciar el servidor
    public listen(): void {
        try {
            DatabaseConnection.appDataSource
                .initialize()
                .then(() => {
                    console.log("Database Connected");

                    this.app.listen(this.port, () => {
                        console.log(
                            `Server Running on: http://localhost:${this.port}${this.apiPrefix}`
                        );
                    });

                    //
                })
                .catch((error) => console.log(error));
        } catch (error: unknown) {
            console.error("Error Starting Server", error);
        }
    }
}
