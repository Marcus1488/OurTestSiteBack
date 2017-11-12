import * as morgan from "morgan";
import IRequestLogger from "../interfaces/IRequestLogger";
import IMiddleware from "../interfaces/IMiddleware";

export default class MorganRequestLogger implements IRequestLogger, IMiddleware {
    constructor() {}

    extractMiddleware() {
        return morgan("dev");
    }
}