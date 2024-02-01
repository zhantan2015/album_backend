import { Router } from "express";
import albumController from "../controller/albumController"

const router = Router()

router.get('/', albumController.get)
router.post('/', albumController.post)

export default router