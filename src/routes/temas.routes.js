import { Router } from "express";
import * as temasCtrl from '../controllers/temas.controller.js'
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const router = Router()

router.post('/',[verifyToken,isAdmin], temasCtrl.crearTema)

router.get('/',[verifyToken,isAdmin], temasCtrl.getTemas)

router.get('/:sesionId',[verifyToken,isAdmin], temasCtrl.getTemasById)

router.put('/:temaId',[verifyToken,isAdmin], temasCtrl.actualizarTemasById)

export default router;