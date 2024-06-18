import { Router } from "express";
import middlewares from '@/api/middlewares'
import { Container } from 'typedi';
import AuthService from '@/services/authen/auth';

const route = Router()

route.post(
    '/signup',
    middlewares.strRequiredValid(['name', 'email', 'password', 'staffCode']),
    async (req, res, next) => {
        try {
            const authServiceInstance = Container.get(AuthService);
            const { user, token } = await authServiceInstance.SignUp(req.body);
            return res.json({ user, token })
        } catch (e) {
            return next(e)
        }
    }
)
route.post(
    '/signin',
    middlewares.strRequiredValid(['email', 'password']),
    async (req, res, next) => {
        try {
            const { email, password } = req.body
            const authServiceInstance = Container.get(AuthService);
            const { user, token } = await authServiceInstance.SignIn(email, password);
            return res.json({ user, token })
        } catch (e) {
            return next(e)
        }
    }
)

export default route