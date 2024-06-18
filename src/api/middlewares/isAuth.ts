
import jwt from "jsonwebtoken"
import config from '@/config';
import fs from 'fs'

const isAuth = (req, res, next) => {
    try {
        let token = null
        if (
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        ) {
            //console.log("req.headers.authorization:",req.headers.authorization.split(' ')[1])
            token = req.headers.authorization.split(' ')[1];
        }
        const isAuth = jwt.verify(token, fs.readFileSync(config.jwtPublicKey));
        if (isAuth) next()
        if (!isAuth) throw { message: "身份验证失败" }
    } catch (e) {
        /**
         * 401-身份验证token失败(无token/token过期)
         * 403-无权限时返回403
         */
        e['status'] = 401
        next(e)
    }
}

export default isAuth;