const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 944,
  viewportWidth: 483,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:19006",
    specPattern: "cypress/specs/**/*.spec.{js,jsx,ts,tsx}",
  },
});
