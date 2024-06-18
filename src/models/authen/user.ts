
import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },

        password: String,

        salt: String,

        role: {
            type: String,
            default: 'user',
        },
        staffCode: String
    },
    { timestamps: true },
)
//mongoose.model() mongoose 会自动找到名称是model name 复数形式的collection,解决方法是重命名
export default mongoose.model<mongoose.Document>('tbl_user', User, 'tbl_user');