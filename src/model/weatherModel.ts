import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface WeatherAttributes {
    id: string;
    ts: string;
    tp: number;
    pr: number;
    hu: number;
    ws: number;
    wd: number;
    ic: string;
    currentId: string
}

export class WeatherInstance extends Model<WeatherAttributes>{ }

WeatherInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    ts: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tp: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    pr: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    hu: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    ws: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    wd: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    ic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currentId: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }

}, {
    sequelize: db,
    tableName: 'weather'
})