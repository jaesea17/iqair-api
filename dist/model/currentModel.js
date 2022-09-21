"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const pollutionModel_1 = require("./pollutionModel");
const weatherModel_1 = require("./weatherModel");
class CurrentInstance extends sequelize_1.Model {
}
exports.CurrentInstance = CurrentInstance;
CurrentInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    dataId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'current'
});
//Establishing the one to many relationship
CurrentInstance.hasMany(pollutionModel_1.PollutionInstance, { foreignKey: 'currentId', as: 'pollution' });
CurrentInstance.hasMany(weatherModel_1.WeatherInstance, { foreignKey: 'currentId', as: 'weather' });
pollutionModel_1.PollutionInstance.belongsTo(CurrentInstance, { foreignKey: 'currentId', as: 'current' });
weatherModel_1.WeatherInstance.belongsTo(CurrentInstance, { foreignKey: 'currentId', as: 'current' });
