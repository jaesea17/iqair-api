import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface PollutionAttributes {
    id: string;
    ts: string;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string,
    currentId: string
}

export class PollutionInstance extends Model<PollutionAttributes>{ }

PollutionInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    ts: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aqius: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    mainus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aqicn: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    maincn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currentId: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'pollution'
})