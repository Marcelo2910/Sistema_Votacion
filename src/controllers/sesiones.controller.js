import Sesion from '../models/sesiones.js'

export const crearSesion = async (req, res) => {
    try {
        let status = 500
        let mensaje = ""
        const newSesion = new Sesion(req.body)
        const fecha_sesion = new Date(newSesion.fecha_sesion)
        const fecha_actual = new Date()
        
        if(newSesion.fecha_sesion == undefined || newSesion.tipo_sesion == undefined){
            status= 404
            mensaje = "Ingrese todos los datos de la sesion"
        }else{
            if(fecha_sesion.getFullYear() >= fecha_actual.getFullYear()){  
                if(fecha_sesion.getMonth() >= fecha_actual.getMonth()){
                    if(fecha_sesion.getDay() >= fecha_actual.getDay()){
                        if(fecha_sesion.getHours() >= fecha_actual.getHours() && fecha_sesion.getMinutes() >= fecha_actual.getMinutes()){
                            const sesionGuardada = await newSesion.save()
                            status =201
                            mensaje = sesionGuardada  
                        }else{
                            status = 404 
                            mensaje = "La hora seleccionada ya paso"
                        }
                        
                    }else{
                        status = 404 
                        mensaje = "El dia seleccionado ya paso"
                    }
                }else{
                    status = 404 
                    mensaje = "El mes seleccionado ya paso"
                }
            }else{
                status = 404 
                mensaje = "El año seleccionado ya paso"
            }
        }
        res.status(status).json({message:mensaje})
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