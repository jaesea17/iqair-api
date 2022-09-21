"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const currentModel_1 = require("./currentModel");
const locationModel_1 = require("./locationModel");
class DataInstance extends sequelize_1.Model {
}
exports.DataInstance = DataInstance;
DataInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'data'
});
//Establishing the one to many relationship
DataInstance.hasMany(locationModel_1.LocationInstance, { foreignKey: 'dataId', as: 'location' });
DataInstance.hasMany(currentModel_1.CurrentInstance, { foreignKey: 'dataId', as: 'current' });
locationModel_1.LocationInstance.belongsTo(DataInstance, { foreignKey: 'dataId', as: 'data' });
currentModel_1.CurrentInstance.belongsTo(DataInstance, { foreignKey: 'dataId', as: 'data' });
