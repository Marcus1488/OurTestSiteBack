export interface ISettings {
    get: GetConfig
}

interface GetConfig {
    (): IConfig
}
export interface IConfig {
    server?: IServerConfig;
    session?: ISessionConfig;
    view?: IViewConfig;
}

export interface IDatabaseConfig {
    database: string;
    dialect: string;
    host: string;
    password: string;
    port: number;
    username: string;
}

export interface IServerConfig {
    port: number;
}

export interface ISessionConfig {
    secret: string;
    key_name: string;
    resave: boolean;
    save_uninitialized: boolean;
    secure_cookie: boolean;
}

export interface IViewConfig {
    path: string;
    engine: string;
}
