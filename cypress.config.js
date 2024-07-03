const { defineConfig } = require("cypress");

module.exports = defineConfig({
  

  reporter: 'cypress-mochawesome-reporter',
  // Configuration object for Cypress

  // This is the main configuration for Cypress tests
  e2e: {
    // Configuration specific to end-to-end tests

    // Cypress plugins and configuration can be defined here
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      config.screenshotOnRunFailure = true;
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    baseUrl: 'https://www.saucedemo.com'
  },
});
