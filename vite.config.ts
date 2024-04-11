import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace'; // Import replace plugin

// Load environment variables from .env file
import { config } from 'dotenv';
config();

export default defineConfig({
  plugins: [
    react(),
    replace({
      // Replace process.env.REACT_APP_XXX with the actual value from .env file
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
    }),
  ],
});
