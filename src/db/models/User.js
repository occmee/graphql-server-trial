import Sequelize from 'sequelize';
import { sequelize } from '../connect';
import { Company } from './'

export const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
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
  /*
  scopes: {
    withCompany: (id) => {
      return {
        where: {
          id: id
        },
        include: [
          { model: Company }
        ]
      };
    }
  }
  */
});

User.belongsTo(Company, {foreignKey: 'company_id'});
