import Temas from '../models/Temas.js'
import Sesion from '../models/sesiones.js'

export const crearTema = async (req, res) => {
    try{
        const TodasSesiones = req.body
        let exito = false;
        if(TodasSesiones.length>1){
            for (let i = 0; i < TodasSesiones.length; i++){
                const existeSesion = await Sesion.findById(TodasSesiones[i].sesion)
                if(existeSesion){
                    const newTema = new Temas(TodasSesiones[i])
                    await newTema.save()
                    exito = true
                }else{
                    exito = false
                    break;
                }
            }
            
        }else {
            const existeSesion = await Sesion.findById(req.body.sesion)
            if(existeSesion){
                const newTema = new Temas(req.body)
                await newTema.save()
                exito = true
            }else{
                exito = false
            }
        }
        if(exito){
            res.status(201).json({message:"Se almaceno correctamente la orden del dia"})
        }else{
            res.status(404).json({message:"No se almacenaron los datos"})
        }
    }catch(error){
        res.status(404).json({message: "Hubo un problema al crear los temas"})
        console.log(error)
    } 
}

export const getTemas = async (req, res) => {
    try {
        const temasSesion = await Temas.find().sort('fecha_sesion')
        if(!temasSesion){
            res.status(404).json({message:"No existe ningun contenido de las sesiones"})
        }else{
            res.status(200).json(temasSesion)
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al mostrar los temas"})
        console.log(error)
    }
}

export const getTemasById = async (req, res) => {
    try {
        const sesionId = req.params.sesionId //para obetener el id se necesita usar el params y no el req.body
        const temasSesion = await Temas.find({sesion: sesionId}).sort('fecha_sesion')
        if(!temasSesion){
            res.status(404).json({message:"No existe la sesion para mostrar su contenido"})
        }else{
            res.status(200).json(temasSesion)
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al mostrar el contenido de la sesion"})
        console.log(error)
    }
}

export const actualizarTemasById = async (req, res) => {

    try {
        const temaActualizado = await Temas.findByIdAndUpdate(req.params.temaId, req.body, {
            new: true
        })
        if (!temaActualizado) {
            res.status(404).json({message:"No existe la sesion para actualizar su contenido"})
        } else {
            res.status(200).json(temaActualizado)
        }
    } catch (error) {
        res.status(404).json({message: "Hubo un problema al actualizar el contenido de la sesion"})
        console.log(error)
    }
}
