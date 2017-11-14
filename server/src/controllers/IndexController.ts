import {Request, Response} from "express";
import CoreController from "../core/modules/base/CoreController";
import {Controller, Route, Middleware, Use} from "../core/modules/base/CoreExpressDecorators";
import Methods from "../core/modules/base/CoreHttpMethods";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
const {GET, POST} = Methods;

@Controller('/api/')
export default class IndexController extends CoreController {

    @Use
    public async allAction(req: Request, res: Response, next: Function) {
        return next();
    }

    @Route(GET,'/')
    @Middleware('verifyToken')
    public async indexAction(req: Request, res: Response) {
        return res.send({
            controller: 'index',
            action: 'get'
        });
    }

    @Route(POST, '/')
    public async addAction(req: Request, res: Response) {
        return res.send({
            controller: 'index',
            action: 'post'
        });
    }

    private async verifyToken(req: Request, res: Response, next: Function) {
        let token = req.headers.authorization;

        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.secret, function(err) {
            if (err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            return next();
        });
    }
}
