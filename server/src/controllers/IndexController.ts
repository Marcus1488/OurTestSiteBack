import {Request, Response} from "express";
import CoreController from "../core/modules/base/CoreController";
import {Controller, Route, Middleware, Use} from "../core/modules/base/CoreExpressDecorators";
import Methods from "../core/modules/base/CoreHttpMethods";
const {GET, POST} = Methods;

@Controller('/')
export default class IndexController extends CoreController {

    @Use
    public async allAction(req: Request, res: Response, next: Function) {
        return next();
    }

    @Route(GET,'/')
    @Middleware('logMiddleware')
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

    private async logMiddleware(req: Request, res: Response, next: Function) {
        console.warn(new Date());
        return next();
    }
}
