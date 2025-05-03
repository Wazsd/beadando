import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  base: '/MANO/webmano/app1/',
  plugins: [react()],
});
