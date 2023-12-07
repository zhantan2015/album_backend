import { Router } from "express";
import photoController from "../controller/photoController"

const router = Router()

router.get('/', photoController.get)
router.post('/', photoController.post)

export default router