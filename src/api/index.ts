import { Router } from "express";
import authenRoute from './routes/authen'

export default () => {
    const app = Router()

    app.use('/authen', authenRoute())

    return app
}
