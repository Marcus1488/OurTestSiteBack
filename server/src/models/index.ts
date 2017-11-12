'use strict';

import * as fs from "fs";
import * as path from "path";
import * as SequelizeStatic from "sequelize";
import {Sequelize} from "sequelize";

import {IDatabaseConfig} from "../core/interfaces";
import JsonSettings from "../core/modules/JsonSettings";
const env: string = process.env.NODE_ENV || "development";
const settings: JsonSettings = new JsonSettings("./settings/database.json");
const config: IDatabaseConfig = settings.get()[env];

import SequelizeModels from "./interfaces";

class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: Sequelize;

  constructor() {
    this._basename = path.basename(module.filename);
    this._sequelize = new SequelizeStatic(config.database, config.username, config.password, config);
    this._models = ({} as any);

    this.walk(__dirname)
      .filter((file: string) => {
        return (path.basename(file) !== this._basename) && path.basename(file).indexOf("interfaces") === -1 && path.basename(file).indexOf(".map") === -1;
      })
      .forEach((file: string) => {
        let model = this._sequelize.import(file);
        this._models[(model as any).name] = model;
      });

    Object.keys(this._models)
      .forEach((modelName: string) => {
        if (typeof this._models[modelName].associate === "function") {
          this._models[modelName].associate(this._models);
        }
      });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }

  private walk(dir: string) {
    let results: string[] = [];
    let list: string[] = fs.readdirSync(dir);

    list.forEach((file: string) => {
      file = path.join(dir, file);
      let stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.walk(file));
      } else {
        results.push(file);
      }
    });
    return results
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
