import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Use the appropriate plugin for your framework (e.g., vue, svelte)

// Define and export the Vite configuration
export default defineConfig({
  plugins: [react()], // Add plugins as needed (e.g., Vue or others)
  server: {
    port: 3000, // Set the development server port
    open: true, // Open the app in the browser when the server starts
  },
  build: {
    outDir: 'dist', // Specify the output directory
    sourcemap: true, // Generate source maps for debugging
  },
});
