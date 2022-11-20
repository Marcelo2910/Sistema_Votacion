import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js';
import {SECRET} from '../config.js'

export const signup = async (req, res) => {
    const {matricula,username,nombre,apellidos,representacion,sector,sexo,unidad_academica,programa_academico,email,password,roles} = req.body;

    try {
        const nuevoUsuario = new User({
            matricula,
            username,
            nombre,
            apellidos,
            representacion,
            sector,
            sexo,
            unidad_academica,
            programa_academico, 
            email,
            password: await User.encriptaPass(password),
        })
        
        if(roles){
            const foundRoles = await Role.find({nombre: {$in: roles}})
            nuevoUsuario.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Role.findOne({nombre: "user"})
            nuevoUsuario.roles = [role._id]
        }
    
        const usuarioGuardado = await nuevoUsuario.save()
    
        const token = jwt.sign({id: usuarioGuardado._id}, SECRET,{
            expiresIn: '12d' // 24 horas
        })
    
        res.status(200).json({token})
    } catch (error) {
        return res.status(404).json({message:"Datos duplicados o faltantes"})
    }
}
export const signin = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

    const matchPassword = await User.comparaPass(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: "Password invalido"})

    const token = jwt.sign({id: userFound._id}, SECRET, {
        expiresIn: '12d' // 86400 24 horas 604800 1 semana
    })

    res.json({token})

}