import * as fs from "fs";
import ISettings from "../interfaces/ISettings";
import CoreSettings from "./base/CoreSettings";

export default class JsonSettings extends CoreSettings implements ISettings {

    constructor(source: string) {
        super();
        const raw = fs.readFileSync(source, "UTF8");
        this.settingsData = JSON.parse(raw);
    }
}
