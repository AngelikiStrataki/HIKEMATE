const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(_, config) {
  //  setupNodeEvents(on, /* eslint-disable no-unused-vars */ _config) {
      // implement node event listeners here
    },
  },
});
