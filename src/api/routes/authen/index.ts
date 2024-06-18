
import { Router } from "express";
import authRoute from './auth'
import userRoute from "./user";

export default () => {
    const route = Router()
    route.use('/auth', authRoute)
    route.use('/user', userRoute)

    return route
}



