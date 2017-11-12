import ISettings from "../../interfaces/ISettings";

/**
 * Virtual class
 */

abstract class CoreSettings implements ISettings {

    protected settingsData: any = null;

    constructor() {}

    public get() {
        return this.settingsData;
    }
}

export default CoreSettings;