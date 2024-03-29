import path from "path"
import { fileURLToPath } from "url"
import { dirname } from 'path'
import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    try {
        console.log("Password from user:", user.password);
        console.log("Provided password:", password);
        return bcrypt.compareSync(password, user.password);

    } catch (error) {
        console.error("Error in isValidPassword:", error);
        return false;
    }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname
