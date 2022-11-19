import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js';
import {SECRET} from '../config.js'
import fs from 'fs'
import { transporter } from '../libs/email.js';


export const createUser = async (req, res) => {
    const {matricula,username,nombre,apellidos,representacion,sector,sexo,unidad_academica,programa_academico,email,password,roles, imagen} = req.body;

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
            imagen,
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
            expiresIn: 86400 // 24 horas 604800 1 semana
        })
        console.log(usuarioGuardado.email)
        await transporter.sendMail({
            from: '"Consejo H universitario 👻" ',
            to: usuarioGuardado.email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>", // html body
        }).then(info => {
            console.log("Se envio el correo")
        }).catch(console.error)

        res.status(200).json({token})
    } catch (error) {
        return res.status(404).json({message:"Datos duplicados o faltantes"})
    }
}

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find()
        if(!usuarios){
            res.status(404).json({message: "No existen usuarios"})
        }else{
            res.status(200).json(usuarios)
        }
    } catch (error){
        res.status(404).json({message: "Hubo un problema al buscar usuarios"})
        console.log(error)
    }
}

export const getUsuarioById = async (req, res) => {
    try{
        const usuario = await User.findById(req.params.usuarioId)
        if(!usuario){
            res.status(404).json({message: "No existen usuarios"})
        }else{
            res.status(200).json(usuario)
        }
    }catch(error){
        res.status(404).json({message: "Hubo un problema al buscar el usuario"})
        console.log(error)
    }
}

export const actualizarUsuarioById = async (req, res) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.usuarioId, req.body, {
            new: true
        })
        if(!usuarioActualizado){
            res.status(404).json({message: "No se actualizo el usuario"})
        }else{
            res.status(200).json(usuarioActualizado)
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al actualizar usuario"})
        console.log(error)
    }
}

export const eliminarUsuarioById = async (req, res) => {
    try{
        const {usuarioId} = req.params
        const usuarioEliminado = await User.findByIdAndDelete(usuarioId)
        if(!usuarioEliminado){ 
            res.status(404).json({message: "No se elimino el usuario"})
        }else{
            res.status(200).json({message: "Usuario Eliminado"})
        }
    }catch(error){
        res.status(404).json({message: "Hubo un problema al eliminar usuario"})
        console.log(error)
    }
}

export const uploadImagen = async (req,res)=>{
     
    const usuario = await User.findById(req.userId)
    try {

        const fileExist = fs.existsSync(usuario.imagen)
        if(fileExist){
            fs.unlinkSync(usuario.imagen)
        }else{
            usuario.imagen = "" 
        }        
        usuario.imagen = req.file.path
        usuario.save()
        if(usuario.imagen!=""){
            res.status(200).json({message:"Se guardo la imagen con exito"})
        }else{
            res.status(404).json({message:"No se asigno la imagen"})
        }
    } catch (error) {
        res.status(404).json({message:"Hubo un problema..."})
        console.log(error)
    }
}