const { authenticate } = require('@feathersjs/authentication').hooks;

const schema = require("./households.model")
const validate = require("feathers-validate-joi")
const admin = require("../../hooks/admin")
const checkUniqueHoushold = require("./hooks/checkUniqueHoushold")
const getchCurrentPrimaryUser = require("./hooks/fetchPrimaryUserDetails");
const addCreatedByField = require('./hooks/addCreatedByField');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), checkUniqueHoushold(), getchCurrentPrimaryUser(), addCreatedByField()],
    update: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), addCreatedByField()],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt'), admin()]
  },

  after: {
    all: [],
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
