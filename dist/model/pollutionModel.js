"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollutionInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class PollutionInstance extends sequelize_1.Model {
}
exports.PollutionInstance = PollutionInstance;
PollutionInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    ts: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aqius: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    mainus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aqicn: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    maincn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    currentId: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'pollution'
});
