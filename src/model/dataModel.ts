import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { CurrentInstance } from './currentModel';
import { LocationInstance } from './locationModel';

interface DataAttributes {
    id: string;
    city: string;
    state: string,
    country: string
}

export class DataInstance extends Model<DataAttributes>{ }

DataInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize: db,
    tableName: 'data'
})

//Establishing the one to many relationship
DataInstance.hasMany(LocationInstance, { foreignKey: 'dataId', as: 'location' });
DataInstance.hasMany(CurrentInstance, { foreignKey: 'dataId', as: 'current' });
LocationInstance.belongsTo(DataInstance, { foreignKey: 'dataId', as: 'data' });
CurrentInstance.belongsTo(DataInstance, { foreignKey: 'dataId', as: 'data' });

