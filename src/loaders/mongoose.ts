import config from "@/config"
import mongoose from "mongoose"

export default async () => {
    const con = await mongoose.connect(config.databaseURL, {
        user: config.databaseUser,
        pass: config.databasePass
    })
    return con.connection.db;
}