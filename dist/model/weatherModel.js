"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class WeatherInstance extends sequelize_1.Model {
}
exports.WeatherInstance = WeatherInstance;
WeatherInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    ts: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tp: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    pr: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    hu: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    ws: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    wd: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    ic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    currentId: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'weather'
});
