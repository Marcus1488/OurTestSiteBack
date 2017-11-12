import * as express from "express";
import {Request, Response, Router, NextFunction} from "express";
import * as session from "express-session";
import * as path from "path";
import * as compression from "compression";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import ISettings from "../interfaces/ISettings";
import MorganRequestLogger from "../modules/MorganRequestLogger";
import CoreApplication from "./base/CoreApplication";
import IController from "../interfaces/IController";
import IError from "../interfaces/IError";
import IErrorHandler from "../interfaces/IErrorHandler";

export default class Application extends CoreApplication {

    private requestLogger: MorganRequestLogger = null;

    constructor(settings: ISettings) {
        super(settings);
        this.requestLogger = new MorganRequestLogger();
    }

    public initialize() {
        // view engine setup
        this.app.set("views", path.join(__dirname, this.parameters.view.path));
        this.app.set("view engine", this.parameters.view.engine);

        // uncomment after placing your favicon in /public
        // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.injectMiddlware(this.requestLogger);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(helmet());
        this.app.set("trust proxy", 1); // trust first proxy
        this.app.use(session({
            secret: this.parameters.session.secret,
            name: this.parameters.session.key_name,
            resave: this.parameters.session.resave,
            saveUninitialized: this.parameters.session.save_uninitialized,
            cookie: {
                secure: this.parameters.session.secure_cookie
            }
        }));
        this.app.use(compression());
        this.app.use(express.static(path.join(__dirname, "public")));

        this.controllers.forEach((controller: IController) => {
            controller.register(this.app);
        });

        // catch 404 and forward to error handler
        this.app.use(function(req: Request, res: Response, next: NextFunction) {
            let err: IError = new Error("Not Found");
            err.status = 404;
            next(err);
        });

        // error handler
        let errorHandler: IErrorHandler = function(err: IError, req: Request, res: Response, next: NextFunction) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            return res.render("error");
        };

        this.app.use(errorHandler);
    }

    public getExpressInstance() {
        return this.app;
    }

}
