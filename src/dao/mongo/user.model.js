import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 }, // Nombre del usuario, obligatorio
    surname: { type: String, required: false, max: 100 }, // Apellido del usuario, opcional
    email: { type: String, required: true, unique: true, max: 100 }, // Email del usuario, único y obligatorio
    age: { type: Number, required: false, max: 100 }, // Edad del usuario, opcional
    password: { type: String, required: false, max: 100 }, // Contraseña del usuario, opcional
    cart: [
        {
            type: [
                {
                    cart: {
                        type: mongoose.Schema.Types.ObjectId, ref: 'carts'
                    }
                }
            ]
        }
    ],
    role: { type: String, enum: ['user', 'premium'], default: 'user' }
})

userSchema.statics.toggleUserRole = async function (userId) {
    try {
        const user = await this.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        user.role = user.role === 'user' ? 'premium' : 'user';

        await user.save();

        return user;
    } catch (error) {
        throw new Error(`Error al cambiar el rol del usuario: ${error.message}`);
    }
};

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
