
import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

//连接.env 配置,将会自动加入到process.env 里
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("not find .env file")
}

export default {
    port: process.env.PORT,
    databaseURL: process.env.MONGODB_URI,
    databaseName: process.env.MONGODB_NAME,
    databaseUser: process.env.MONGODB_USER,
    databasePass: process.env.MONGODB_PASS,

    apiPrefix: process.env.API_PREFIX || '',
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME || '5 seconds',
        concurrency: parseInt((process.env.AGENDA_CONCURRENCY || '20'), 10)
    },

    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    jwtPublicKey: process.env.JWT_PUBLIC_KEY,

}