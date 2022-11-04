// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const customHooks = require('./fp.hooks');


module.exports = function (app)
{
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };


  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  //custom created service by Sidhesh Parab
  app.use('/forgetpassword', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  //custom created service by Sidhesh Parab
  const forgetpassword = app.service('forgetpassword');

  service.hooks(hooks);
  forgetpassword.hooks(customHooks);
  
};
