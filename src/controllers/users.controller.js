import addUser from "../services/UserService.js"
import UserService from "../services/UserService.js";

export async function toggleUserRole(req, res) {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).send("Se requiere un ID de usuario válido");
        }

        const userService = new UserService();
        const updatedUser = await userService.toggleUserRole(userId);
        if (!updatedUser) {
            return res.status(404).send("Usuario no encontrado o no se pudo cambiar el rol");
        }

        res.status(200).json({ message: 'Rol del usuario cambiado exitosamente', user: updatedUser });
    } catch (error) {
        console.error("Error al cambiar el rol del usuario en el controlador:", error);
        res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
    }
}

export async function registerUser(req, res) {

    try {
        console.log("Registering user...");
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            console.log("Faltan datos");
            res.status(400).send("Faltan datos");
        }
        const newUser = await addUser({ name, email, password, role });

        res.redirect("/login");
    } catch (error) {
        res.status(500).send("Error al registrar usuario: " + error.message);
    }
}

export async function loginUser(req, res) {

    try {
        let user = req.user
        if (user.role === "admin") {
            req.session.email = user.email
            req.session.role = user.role
            req.session.name = user.name
            req.session.surname = user.surname
            req.session.age = user.age;
            req.session.user = user;
            res.redirect("/api/users/profile")

        } else {
            req.session.email = user.email
            req.session.role = user.role
            req.session.name = user.name
            req.session.surname = user.surname
            req.session.age = user.age;
            req.session.user = user;
            res.redirect("/api/products")
        }
        console.log("Session establecida:", req.session.user);

    } catch (error) {
        res.status(500).json("Usuario o contraseña incorrectos")
    }
}

export async function logoutUser(req, res) {

    try {
        req.session.destroy()
        res.redirect("/login")

    } catch (error) {
        res.status(500).json(error)
    }
}

export async function handleGitHubCallback(req, res) {

    try {
        req.session.user = req.user;
        req.session.email = req.user.email;
        req.session.role = req.user.role;

        res.redirect("/api/users/profile");

    } catch (error) {
        res.status(500).json("Autenticacion erronea de GitHub");
    }
}




