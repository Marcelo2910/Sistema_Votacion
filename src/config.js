import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 5000
export const DATABASE = process.env.DATABASE || process.env.MONGO_ATLAS
export const CORREO = process.env.CORREO
export const PASS_CORREO = process.env.PASS_CORREO
export const PORT_CORREO = process.env.PORT_CORREO
export const SECRET = process.env.SECRET