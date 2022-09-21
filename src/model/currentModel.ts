import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { PollutionInstance } from './pollutionModel';
import { WeatherInstance } from './weatherModel';

interface CurrentAttributes {
    id: string;
    dataId: string
}

export class CurrentInstance extends Model<CurrentAttributes>{ }

CurrentInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    dataId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'current'
})

//Establishing the one to many relationship
CurrentInstance.hasMany(PollutionInstance, { foreignKey: 'currentId', as: 'pollution' });
CurrentInstance.hasMany(WeatherInstance, { foreignKey: 'currentId', as: 'weather' });
PollutionInstance.belongsTo(CurrentInstance, { foreignKey: 'currentId', as: 'current' });
WeatherInstance.belongsTo(CurrentInstance, { foreignKey: 'currentId', as: 'current' });