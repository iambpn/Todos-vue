'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tasks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
        toJSON() {
            // changing id to uuid and uuid to undefined
            return {...this.get(),id:this.get().uuid,uuid:undefined}
        }
    };
    tasks.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        content: DataTypes.STRING,
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'tasks',
    });
    return tasks;
};