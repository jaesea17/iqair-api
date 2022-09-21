"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class LocationInstance extends sequelize_1.Model {
}
exports.LocationInstance = LocationInstance;
LocationInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    coordinates: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.FLOAT)
    },
    dataId: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'location'
});
