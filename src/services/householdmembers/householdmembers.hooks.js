const { authenticate } = require('@feathersjs/authentication').hooks;

const schema = require("./householdmembers.model")
const validate = require("feathers-validate-joi")


// hooks
const fetchHoushold = require("./hooks/fetchHoushold")
const fetchUser = require("./hooks/fetchUser")
const admin   = require("../../hooks/admin")

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), fetchHoushold(), fetchUser()],
    update: [authenticate('jwt'), validate.form(schema, { abortEarly: false })],
    patch: [authenticate('jwt'),],
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
