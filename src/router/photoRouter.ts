import { Router } from "express";
import photoController from "../controller/photoController"
import photoUploader from "../middleware/photoUploader";


const router = Router()

router.get('/', photoController.get)
router.post('/', photoUploader('file'), photoController.post)

export default router