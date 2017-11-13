import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";

//region interface
export interface UserAttributes {
    username: string;
    password: string;
}

export interface UserInstance extends SequelizeStatic.Instance<UserAttributes> {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type User = SequelizeStatic.Model<UserInstance, UserAttributes>;

export default function (sequelize: Sequelize, dataTypes: DataTypes): User {
    let User = sequelize.define<UserInstance, UserAttributes>("User",
        {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: dataTypes.TEXT,
                allowNull: true
            },
            password: {
                type: dataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: "users",
            indexes: [],
            classMethods: {},
            timestamps: false
        });

    return User;
}
