export * from './Company';
export * from './User';

import { Company } from './Company';
import { User } from './User';

export function initTables() {

  function initComapny() {
    return Company.sync({force: true}).then(() => {
      return Company.create({
        name: 'リレーションズ株式会社'
      });
    });
  }

  function initUser() {
    return User.sync({force: true}).then(() => {
      return User.create({
        firstName: 'John',
        lastName: 'Hancock',
        email: 'hoge@a.com',
        companyId: 1
      });
    });
  }

  return initComapny().then(() => {
    initUser();
  });

}
