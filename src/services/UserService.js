import UserRepository from "../repositories/users.repository.js";
import UserModel from '../dao/mongo/user.model.js';
import addUser from "../services/UserService.js";
import User from '../dao/mongo/user.model.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    toggleUserRole = async (userId) => {
        try {
            const user = await this.userRepository.toggleUserRole(userId);

            if (!user) {
                this.handleError("cambiar el rol del usuario", new Error("Usuario no encontrado"));
            }

            return user;
        } catch (error) {
            this.handleError("cambiar el rol del usuario", error);
        }
    };

    handleError = (action, error) => {
        console.error(`Error al ${action}:`, error);
        throw new Error(`Error al ${action}`);
    }

    addUser = async (user) => {
        try {
            const newUser = await this.userRepository.addUser(user);
            if (!newUser) {
                this.handleError("agregar usuario", new Error("Usuario no registrado"));
            }
            return newUser;

        } catch (error) {
            this.handleError("agregar usuario", error);
        }
    }


    getUsers = async () => {
        try {
            const users = await this.userRepository.getUsers();
            if (!users) {
                this.handleError("No hay usuarios", new Error("No existe"))
            }
            return users;

        } catch (error) {
            console.log("Error al obtener usuarios: ", error);
            this.handleError("Error al obtener usuario", error)
        }
    }


    getUserById = async (id) => {
        try {
            const user = await this.userRepository.getUserById(id);
            if (!user) {
                this.handleError("Usuario no encontrado", new Error("No encontrado"))
            }
            return user;

        } catch (error) {
            console.log("Error al obtener usuario por id: ", error);
            this.handleError("Error al obtener usuario por id", error)

        }
    }


    getUserByEmail = async (email) => {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                this.handleError("Usuario no encontrado", new Error("No encontrado"))

            }
            return user;

        } catch (error) {
            console.log("Error al obtener usuario por email: ", error);
            this.handleError("Error al obtener usuario por email", error)

        }
    }


    updateUser = async (id, user) => {
        try {
            const updatedUser = await this.userRepository.updateUser(id, user);
            if (!updatedUser) {
                this.handleError("No se pudo actualizar el usuario", new Error("No encontrado"))
            }
            return updatedUser;

        } catch (error) {
            console.log("Error al actualizar usuario: ", error);
            this.handleError("Error al actualizar usuario", error)
        }
    }

    deleteUser = async (id) => {
        try {
            const deletedUser = await this.userRepository.deleteUser(id);
            if (!deletedUser) {
                this.handleError("Usuario no eliminado", new Error("No eliminado"))
            }
            return deletedUser;

        } catch (error) {
            console.log("Error al eliminar usuario: ", error);
            this.handleError("Error al eliminar usuario", error)
        }
    }


    validateUser = async (email, password) => {
        try {
            const user = await this.userRepository.validateUser(email, password);
            if (!user) {
                this.handleError("Usuario no encontrado", new Error("No encontrado"))
            }
            return user;

        } catch (error) {
            console.log("Error al validar usuario: ", error);
            this.handleError("Error al validar usuario", error)
        }
    }


    findUser = async (email) => {
        try {
            const user = await this.userRepository.findUser(email);
            if (!user) {
                this.handleError("Usuario no encontrado", new Error("No encontrado"))
            }
            return user;

        } catch (error) {
            console.error("Error al encontrar el usuario: ", error);
            this.handleError("Error al encontrar el usuario", error)
        }
    }


    findEmail = async (param) => {
        try {
            const email = await this.userRepository.findEmail(param);
            if (!email) {
                this.handleError("Usuario no encontrado", new Error("No encontrado"))
            }
            return email;

        } catch (error) {
            console.error("No se pudo encontrar", error);
            this.handleError("Error al encontrar", error)
        }
    }

    canCreateProduct = (user) => {
        return user.role === 'premium';
    };
}

export default UserService
