
import { Service, Inject, Container } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { Model, Document } from 'mongoose';

@Service()
export default class AuthService {
    constructor(
        @Inject("userModel") private userModel: Model<any & Document>,
    ) { }

    public async SignUp(params) {
        const salt = randomBytes(32);
        //this.userModel = Container.get('userModel')
        const hashedPassword = await argon2.hash(params.password, { salt });
        const userRecord = await this.userModel.create({
            name: params.name,
            email: params.email,
            staffCode: params.staffCode,
            salt: salt.toString('hex'),
            password: hashedPassword,
        });
        const token = this.generateToken(userRecord);
        if (!userRecord) {
            throw new Error('注册失败');
        }
        const user: any = userRecord.toObject();
        delete user.password
        delete user.salt

        return { user, token }
    }
    public async SignIn(email, password) {
        try {
            const userRecord = await this.userModel.findOne({ email });
            if (!userRecord) {
                throw new Error('User not registered');
            }
            const validPassword = await argon2.verify(userRecord.password, password);
            if (!validPassword) throw new Error('Invalid Password');
            const token = this.generateToken(userRecord);
            const user = userRecord.toObject();
            delete user.password
            delete user.salt
            return { user, token };
        } catch (e) {
            throw e
        }
    }
    private generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign(
            {
                _id: user._id,
                role: user.role,
                name: user.name,
            },
            fs.readFileSync(config.jwtPrivateKey),
            { algorithm: 'RS256', expiresIn: '720m' },
        );
    }
}


