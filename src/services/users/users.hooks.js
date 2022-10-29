const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;


const schema = require("./users.model");
const validate = require('feathers-validate-joi');
// const getUserWithLastName = require('./hooks/getUserWithLastName');
const admin = require("../../hooks/admin");
const fetchAdminId = require('./hooks/fetchAdminId');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(schema, { abortEarly: false }), hashPassword('password')],
    update: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), hashPassword('password')],
    patch: [authenticate('jwt'), admin(), fetchAdminId()],
    remove: [authenticate('jwt'), admin()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
