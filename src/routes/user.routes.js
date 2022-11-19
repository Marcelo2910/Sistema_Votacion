import { Router } from "express";
import * as userCtrl from '../controllers/user.controller.js'
import {verifyToken, isAdmin} from '../middlewares/authJwt.js'
import {checkRolesExisted} from '../middlewares/verifySigup.js'
import {upload} from '../libs/storage.js'

const router = Router()

router.get('/',[verifyToken,isAdmin], userCtrl.getUsuarios)

router.get('/:usuarioId',[verifyToken,isAdmin], userCtrl.getUsuarioById)

router.post('/', [verifyToken, isAdmin, checkRolesExisted], userCtrl.createUser)

router.put('/:usuarioId',[verifyToken,isAdmin], userCtrl.actualizarUsuarioById)

router.delete('/:usuarioId',[verifyToken,isAdmin], userCtrl.eliminarUsuarioById)

router.post('/upload/', [ verifyToken,upload.single("imagen")], userCtrl.uploadImagen)

export default router;