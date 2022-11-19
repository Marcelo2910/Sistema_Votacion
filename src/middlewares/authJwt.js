import jwt from 'jsonwebtoken'
import {SECRET} from '../config.js'
import User from '../models/User.js'
import Role from '../models/Role.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["token"];

        if(!token) return res.status(403).json({message: "Necesita iniciar sesion" })

        const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id

        const usuario = await User.findById(req.userId, {password: 0})
        if(!usuario) return res.status(404).json({message:"usuario no encontrado"})

        next();
    } catch (error) {
        return res.status(401).json({message:"No autorizado"})
    }
}

export const isAdmin = async (req, res, next) => {
    const userAdmin = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: userAdmin.roles}})

    for(let i=0; i<roles.length; i++){
        if(roles[i].nombre === "admin"){
            next()
            return;
        }
        
    }

    return res.status(403).json({message: "No tienes permisos para realizar eso"})
}