import { Container } from 'typedi';
import mongoose from 'mongoose';

const attachCurrentUser = async (req, res, next) => {

    try {
        const UserModel = Container.get('userModel') as mongoose.Model<mongoose.Document>
        const userRecord = await UserModel.findById(req.token._id)
        if (!userRecord) {
            return res.sendStatus(401);
        }
        const currentUser: any = userRecord.toObject();
        delete currentUser.password
        delete currentUser.salt
        req.currentUser = currentUser
        return next()
    } catch (e) {
        console.log(`🔥 Error attaching user to req: ${e}`);
        return next(e);
    }
}

export default attachCurrentUser;