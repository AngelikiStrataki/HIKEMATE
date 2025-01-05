const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(_, /* eslint-disable no-unused-vars */ _config) {
  //  setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
