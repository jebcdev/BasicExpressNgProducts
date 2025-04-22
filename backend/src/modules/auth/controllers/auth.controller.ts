// Importa las clases necesarias de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express";

// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
import { plainToInstance } from "class-transformer";

// Importa las funciones de "class-validator" para realizar validaciones de datos.
import { validate, ValidationError } from "class-validator";

// Importa tipos de TypeORM para manejar resultados de actualizaciones.
import { UpdateResult } from "typeorm";

// Importa el servicio de autenticación para manejar la lógica de negocio.
import { AuthService } from "../services/auth.service";

// Importar los DTOs para la validación de datos de entrada.
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";

// Importa utilidades para manejar el hashing de contraseñas y la generación de tokens JWT.
import { BcryptUtil } from "../../../utils/bcrypt.util";
import { JwtUtil } from "../../../utils/jwt.util";

// Importa la entidad de usuario para interactuar con la base de datos.
import { UserEntity } from "../../user/entities/user.entity";
import { UpdateUserDto } from "../dtos/update-user.dto";

// Define la clase AuthController para manejar la autenticación de usuarios.
export class AuthController {
    // Define una instancia del servicio de autenticación para interactuar con la base de datos.
    private service: AuthService;

    constructor() {
        // Inicializa el servicio de autenticación.
        this.service = new AuthService();
    }

    // Método para manejar el inicio de sesión de usuarios.
    public async login(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de inicio de sesión.
            const dto: LoginUserDto = plainToInstance(
                LoginUserDto,
                req.body
            );

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, devuelve una respuesta con el mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | UserController CreateNew",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Obtiene el usuario por su correo electrónico.
            let data = await this.service.getByEmail(dto.email);

            // Si el usuario no existe, devuelve un mensaje de error.
            if (!data)
                return res.status(401).json("Invalid Credentials");

            // Comprueba si la contraseña ingresada coincide con la almacenada (hasheada).
            const isMatch = await BcryptUtil.comparePassword(
                dto.password,
                data.password
            );

            // Si las contraseñas no coinciden, devuelve un mensaje de error.
            if (!isMatch)
                return res.status(401).json("Invalid Credentials");

            // Genera un token JWT para el usuario autenticado.
            const token = await this.service.login(
                data.role.id,
                data.id
            );

            // Devuelve una respuesta exitosa con la información del usuario y el token.
            return res.status(200).json({
                id: data.id,
                name: data.name,
                surname: data.surname,
                email: data.email,
                role: {
                    id: data.role.id,
                    name: data.role.name,
                },
                created_at: data.created_at,
                token,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(401).json({
                message: "Unauthorized",
                data: error,
            });
        }
    }

    // Método para obtener el perfil del usuario autenticado.
    public async profile(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Obtiene el token de autorización de los encabezados de la solicitud.
            const token: string = req.headers.authorization?.split(
                " "
            )[1] as string;

            // Verifica la validez del token.
            const decoded = await JwtUtil.verifyToken(token);

            // Extrae el ID del usuario del token decodificado.
            const id: number = Number(decoded?.data?.user_id);

            // Si no se obtiene un ID válido, devuelve un error de autorización.
            if (!id) return res.status(401).json("Unauthorized");

            // Obtiene los datos del usuario por su ID.
            let data = await this.service.getById(id);

            // Si el usuario no existe, devuelve un error de autorización.
            if (!data) return res.status(401).json("Unauthorized");

            const resData = {
                ...data, // Copiamos todos los datos del usuario
                token: token, // Añadimos el token al mismo nivel
                role: data.role, // Mantenemos el objeto role completo
            };
            // Devuelve la información del perfil del usuario.
            return res.status(200).json(resData);
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(500).json({
                message: "Unauthorized",
                data: error,
            });
        }
    }

    // Método para registrar un nuevo usuario.
    public async register(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de registro de usuario.
            const dto: RegisterUserDto = plainToInstance(
                RegisterUserDto,
                req.body
            );

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, devuelve una respuesta con el mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | AuthController Register",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Verifica si el usuario ya existe en la base de datos por su correo electrónico.
            const exists: UserEntity | null =
                await this.service.getByEmail(dto.email);

            // Si el usuario ya existe, devuelve un mensaje de error.
            if (exists) {
                return res
                    .status(400)
                    .json(`User Already Exists: ${exists.name}`);
            }

            // Hashea la contraseña antes de guardarla en la base de datos.
            dto.password = await BcryptUtil.hashPassword(
                dto.password
            );

            // Crea el nuevo usuario usando el servicio y el DTO.
            let data: UserEntity | null = await this.service.register(
                plainToInstance(UserEntity, dto)
            );

            // Si hubo un error al crear el usuario, devuelve un mensaje de error.
            if (!data)
                return res.status(500).json("Error Registering User");

            data = await this.service.getByEmail(data.email);

            const token = await this.service.login(
                data?.role.id!,
                data?.id!
            );

            // Si el usuario fue creado correctamente, devuelve los datos del usuario registrado.
            return res.status(201).json({
                id: data?.id,
                name: data?.name,
                surname: data?.surname,
                email: data?.email,
                role: {
                    id: data?.role.id,
                    name: data?.role.name,
                },
                created_at: data?.created_at,
                token,
            });
        } catch (error) {
            console.log(error);
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(401).json({
                message: "Error Registering User",
                data: error,
            });
        }
    }

    public async checkToken(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Obtiene el token de autorización de los encabezados de la solicitud.
            const token: string = req.headers.authorization?.split(
                " "
            )[1] as string;

            // Verifica la validez del token.
            const decoded = await JwtUtil.verifyToken(token);

            // Extrae el ID del usuario del token decodificado.
            const id: number = Number(decoded?.data?.user_id);

            // Si no se obtiene un ID válido, devuelve un error de autorización.
            if (!id) return res.status(401).json("Unauthorized");

            // Obtiene los datos del usuario por su ID.
            const data = await this.service.getById(id);

            // Si el usuario no existe, devuelve un error de autorización.
            if (!data) return res.status(401).json("Unauthorized");

            const resData = {
                ...data, // Copiamos todos los datos del usuario
                token: token, // Añadimos el token al mismo nivel
                role: data.role, // Mantenemos el objeto role completo
            };
            // Devuelve la información del perfil del usuario.
            return res.status(200).json(resData);
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(401).json({
                message: "Unauthorized",
                data: error,
            });
        }
    }

    public async updateById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            let token: string = req.headers.authorization?.split(
                " "
            )[1] as string;

            const decoded = await JwtUtil.verifyToken(token);

            const id: number = Number(decoded?.data?.user_id);

            if (!id) return res.status(401).json("Unauthorized");

            let data = await this.service.getById(id);

            if (!data) return res.status(401).json("Unauthorized");

            const dto: UpdateUserDto = plainToInstance(
                UpdateUserDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, devuelve una respuesta con el mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | AuthController Update",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Verifica si el usuario ya existe en la base de datos por su correo electrónico.
            const exists: UserEntity | null =
                await this.service.getByEmail(dto.email);

            // Si el usuario ya existe, devuelve un mensaje de error.
            if (exists && exists.email !== dto.email) {
                return res
                    .status(400)
                    .json(`User Already Exists: ${exists.name}`);
            }

            if (dto.password)
                dto.password = await BcryptUtil.hashPassword(
                    dto.password
                );

            await this.service.updateById(
                id,
                plainToInstance(UserEntity, dto)
            );

            const updatedData: UpdateResult | null =
                await this.service.updateById(
                    id,
                    plainToInstance(UserEntity, dto)
                );

            // Si hubo un error al actualizar, devuelve un mensaje de error.
            if (!updatedData)
                return res.status(500).json("Error Updating User");

            // Llama al servicio para obtener el usuario actualizado por su ID.
            data = await this.service.getById(id);

            if (!data) return res.status(401).json("Unauthorized");

            token = await this.service.login(
                data?.role.id!,
                data?.id!
            );

            // Si la actualización fue exitosa, devuelve el usuario actualizado con un mensaje de éxito.
            return res.status(201).json({
                id: data?.id,
                name: data?.name,
                surname: data?.surname,
                email: data?.email,
                role: {
                    id: data?.role.id,
                    name: data?.role.name,
                },
                created_at: data?.created_at,
                token,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Unauthorized",
                data: error,
            });
        }
    }
}
