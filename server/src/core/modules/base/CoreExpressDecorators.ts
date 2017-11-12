import * as _ from 'lodash';
import {Application, Router} from 'express';
import trimslash from "../utils/trimslash";

function _middleware(fn) {
    return function (target, key, descriptor) {
        setRoute(target, key, {handlers: [fn]});
        return descriptor;
    };
}

function setRoute(target, key, value) {
    if (!target.routes) {
        target.routes = {};
    }

    target.routes[key] = _.mergeWith(target.routes[key] || {}, value, function (a, b) {
        if (Array.isArray(a)) {
            return a.concat(b);
        }
    });
}

export function Controller(baseUrl) {
    return function (target) {
        target.prototype.baseUrl = baseUrl;

        target.prototype.register = function (router: Application | Router) {
            if (this.routes) {
                const context = this;

                for (let key in this.routes) {
                    let route = this.routes[key];
                    let baseUrl: string = trimslash(this.__proto__.baseUrl);
                    let url: string = route.path;

                    if (route.method !== 'param' && _.isString(url)) {
                        url = (baseUrl + trimslash(url)) || '/';
                    }

                    let args = route.handlers.map((function (route, url) {
                        return function (handler) {
                            return function (req, res, next) {
                                let result = handler.apply(context, arguments);
                                if (!_.isUndefined(result) && !_.isNull(result) && _.isFunction(result.then)) {
                                    result.then(undefined, next);
                                }
                            };
                        };
                    })(route, url));

                    if (url) {
                        args.unshift(url);
                    }

                    router[route.method].apply(router, args);
                }
            }
        };
    };
}

export function Route(method, path) {
    return function (target, key, descriptor) {
        setRoute(target, key, {method: method, path: path, handlers: [descriptor.value]});
        return descriptor;
    };
}


export function Use(target, key, descriptor) {
    if (typeof target !== 'undefined' && typeof key !== 'undefined') {
        setRoute(target, key, {method: 'use', handlers: [descriptor.value]});
        return descriptor;
    } else {
        return Route('use', target);
    }
}


export function Middleware(fn) {
    if (typeof fn === 'string') {
        let name = fn;
        fn = function (request, response, next) {
            if (!this[name]) {
                throw new Error('middleware could not find function this.' + name);

            } else {
                return this[name](request, response, next);
            }
        }
    }

    return _middleware(fn);
}