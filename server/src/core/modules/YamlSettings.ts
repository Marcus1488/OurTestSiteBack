import * as fs from "fs";
import * as yaml from "js-yaml";
import ISettings from "../interfaces/ISettings";
import CoreSettings from "./base/CoreSettings";

export default class YamlSettings extends CoreSettings implements ISettings {

    constructor(source: string) {
        super();
        const raw = fs.readFileSync(source, "UTF8");
        this.settingsData = yaml.safeLoad(raw);
    }
}
