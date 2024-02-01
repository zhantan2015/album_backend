import { Router } from "express";
import authControlller from "../controller/authController"
import generateToken from "../middleware/generateToken";

const router = Router()

router.post('/', authControlller.post,generateToken)

export default router