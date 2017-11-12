declare function require(name: string);
require('source-map-support').install();

import CoreServer from "./core/modules/CoreServer";
import Application from "./core/modules/Application";
import YamlSettings from "./core/modules/YamlSettings";
import IndexController from "./controllers/IndexController";
import UserController from "./controllers/UserController";

const settings: YamlSettings = new YamlSettings("./settings/settings.yml");
const application: Application = new Application(settings);
const server: CoreServer = new CoreServer(application, settings);

const ic : IndexController = new IndexController();
const uc: UserController = new UserController();

application.attachController(ic);
application.attachController(uc);

application.initialize();

server.start();
