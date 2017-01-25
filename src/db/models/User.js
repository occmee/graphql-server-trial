import Sequelize from 'sequelize';
import { sequelize } from '../connect';
import { Company } from './'

export const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  companyId: {
    type: Sequelize.INTEGER,
    field: 'company_id',
    references: {
      model: Company,
      key: 'id'
    }
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  // underscored: true // Auto generated columns (foreign key, timestamp, etc) should use snake case
});

User.belongsTo(Company, {foreignKey: 'company_id'});
