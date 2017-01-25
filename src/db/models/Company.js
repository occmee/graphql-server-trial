import Sequelize from 'sequelize';
import { sequelize } from '../connect';

export const Company = sequelize.define('company', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  phoneNumber: {
    type: Sequelize.STRING,
    field: 'phone_number'
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  // underscored: true // Auto generated columns (foreign key, timestamp, etc) should use snake case
});
