import Sesion from '../models/sesiones.js'

export const crearSesion = async (req, res) => {
    try {
        const newSesion = new Sesion(req.body)
        if(!newSesion){
            res.status(404).json({message:"Ingrese todos los datos de la sesion"})
        }else{
            if(!newSesion.fecha_sesion < Date.now){
                const sesionGuardada = await newSesion.save()
                res.status(201).json(sesionGuardada)
            }else{
                res.status(404).json({msg:"No se puede crear una sesion en una fecha que ya paso"})
            }
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al crear la sesion"})
        console.log(error)
    }    
}

export const getSesiones = async (req, res) => {
    try {
        const sesiones = await Sesion.find().all()
        console.log(sesiones)
        if (!sesiones || sesiones.length==0) {
            res.status(404).json({message:"No existe la sesion"})
        } else {
            res.status(200).json(sesiones)
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al obtener las sesiones"})
        console.log(error)
    }
}

export const getSesionById = async (req, res) => {
    try {
        const sesion = await Sesion.findById(req.params.sesionId)
        if (!sesion) {
            res.status(404).json({message:"No existen la sesion"})
        } else {
            res.status(200).json(sesion)
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al obtener la sesion"})
        console.log(error)
    }
}

export const actualizarSesionById = async (req, res) => {
    try {
        const sesionActualizada = await Sesion.findByIdAndUpdate(req.params.sesionId, req.body, {
            new: true
        })
        if (!sesionActualizada) {
            res.status(404).json({message:"No existe el dato que quiere actualizar o esta mal"})
        } else {
            res.status(200).json({message:"Sesion actualizada"})
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al actualizar la sesion"})
        console.log(error)
    }
}

export const eliminarSesionById = async (req, res) => {
    try {
        const {sesionId} = req.params
        const Eliminar = await Sesion.findById(sesionId)
        const sesionEliminada = Eliminar.deleteMany()
        if (!sesionEliminada) {
            res.status(404).json({message:"No se pudo eliminar la sesion"})
        } else {
            res.status(200).json({message:"Sesion eliminada"})            
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al eliminar la sesion"})
        console.log(error)
    }
}