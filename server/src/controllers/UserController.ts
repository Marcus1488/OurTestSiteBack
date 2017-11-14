import {Request, Response} from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import CoreController from "../core/modules/base/CoreController";
import {Controller, Route} from "../core/modules/base/CoreExpressDecorators";
import Methods from "../core/modules/base/CoreHttpMethods";
import * as db from "../models";
import config from "../config/config";

const {GET, POST, PUT} = Methods;

@Controller('/api/user')
export default class UserController extends CoreController {

    @Route(POST, '/authenticate')
    public async authenticateUser(req: Request, res: Response, next: Function) {
        try {
            let user = await db.models.User.findOne({where: {username: req.body.username}});
            if (!user) return res.status(404).send('No user found.');
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({
                user: {
                    id: user.id,
                    username: user.username
                },
                token: token
            });

        } catch (err) {
            return next(err)
        }
    }

    @Route(POST, '/register')
    public async registerUser(req: Request, res: Response, next: Function) {
        try {
            if (!req.body.username || !req.body.password) return res.status(404).send('Error.');

            let hashedPassword = bcrypt.hashSync(req.body.password, 8);

            let user = await db.models.User.create({
                username: req.body.username,
                password: hashedPassword
            });

            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400
            });

            res.status(200).send({
                user: {
                    id: user.id,
                    username: user.username
                },
                token: token
            });
        } catch (err) {
            return next(err)
        }

    }
}