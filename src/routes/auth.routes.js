import { Router } from "express";
const router = Router()

import * as authCtrl from '../controllers/auth.controller.js'
import {checkDuplicateUsernameOrEmail,checkRolesExisted} from '../middlewares/verifySigup.js'

router.post('/signup',[checkDuplicateUsernameOrEmail, checkRolesExisted], authCtrl.signup)
router.post('/signin', authCtrl.signin)

export default router;