import { Router } from "express";
import * as sesionCtrl from '../controllers/sesiones.controller.js'
import { verifyToken, isAdmin } from "../middlewares/authJwt.js"

const router = Router()

router.post('/',[verifyToken,isAdmin], sesionCtrl.crearSesion)

router.get('/',[verifyToken,isAdmin], sesionCtrl.getSesiones)

router.get('/:sesionId',[verifyToken,isAdmin], sesionCtrl.getSesionById)

router.put('/:sesionId',[verifyToken,isAdmin], sesionCtrl.actualizarSesionById)

router.delete('/:sesionId',[verifyToken,isAdmin], sesionCtrl.eliminarSesionById)

export default router;