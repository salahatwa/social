declare const require: any;
const { name, description, version } = require('../../package.json');

export const environment = {
  production: true,
  api: 'https://mbootx.herokuapp.com/socialty/api/v1',
  name,
  description,
  version,
};
