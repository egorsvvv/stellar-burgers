import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // здесь можно установить слушатели событий
    },
    // Убедитесь, что включена поддержка TypeScript
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Убедитесь, что этот путь настроен правильно
  },
});