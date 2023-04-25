// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [vue()],
	// server: {
	// 	proxy: {
	// 		'/v1': {
	// 			target: 'http://localhost:3000/',
	// 			changeOrigin: true,
	// 			rewrite: path => path.replace(/^\/v1/, '')
	// 		}
	// 	}
	// }
})
