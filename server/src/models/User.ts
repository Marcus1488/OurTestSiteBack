import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";

//region interface
export interface UserAttributes {
  email: string;
  username: string;
}

export interface UserInstance extends SequelizeStatic.Instance<UserAttributes> {
  // I'm exposing every DB column as an instance field to so that tsc won't complain.
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type User = SequelizeStatic.Model<UserInstance, UserAttributes>;
//endregion

export default function (sequelize: Sequelize, dataTypes: DataTypes): User {
  let User = sequelize.define<UserInstance, UserAttributes>("User",
    {
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: dataTypes.TEXT,
        allowNull: true
      },
      age: dataTypes.INTEGER,
    },
    {
      tableName: "users",
      indexes: [],
      classMethods: {},
      timestamps: false
    });

  return User;
}
