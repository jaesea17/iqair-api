import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface LocationAttributes {
    id: string;
    type: string;
    coordinates: number[];
    dataId: string;
}

export class LocationInstance extends Model<LocationAttributes>{ }

LocationInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coordinates: {
        type: DataTypes.ARRAY(DataTypes.FLOAT)
    },
    dataId: {
        type: DataTypes.STRING
    },

}, {
    sequelize: db,
    tableName: 'location'
})