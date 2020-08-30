declare const require: any;
const { name, description, version } = require('../../package.json');

export const environment = {
  production: true,
  api: 'http://localhost:8080/socialty/api/v1',
  name,
  description,
  version,
};
