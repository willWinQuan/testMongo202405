
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import moment from 'moment'
import config from '@/config'
import routes from '@/api'
import path from 'path'
import { isCelebrateError } from 'celebrate'

export default ({ app }: { app: express.Application }) => {

    app.use(cors())

    app.use(express.json())
    morgan.token('dateFormat', (req) => {
        return moment().format("YYYY-MM-DD HH:mm:ss")
    })
    app.use(morgan('[:dateFormat] :method :url :status :res[content-length] - :response-time ms'))
    app.use(config.apiPrefix, routes())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'client')));

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        let errMsg = err.message
        if (isCelebrateError(err)) {
            errMsg = ''
            err.details.forEach(item => {
                errMsg += item.message
            })
        }
        //db 返回的错误处理
        if (err.code == 11000) {//重复的key
            errMsg = ``
            for (let key in err.keyValue) {
                errMsg += `${key}:${err.keyValue[key]} 已有注册,请登录`
            }
        }
        res.json({
            status: err.status || 500,
            errors: {
                message: errMsg,
            },
        });
    })
}