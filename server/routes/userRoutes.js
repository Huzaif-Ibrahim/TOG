import express from 'express'
import { userLogin } from '../controllers/userControllers.js'
const userRoutes = express.Router()

userRoutes.get('/login',userLogin)

export default userRoutes