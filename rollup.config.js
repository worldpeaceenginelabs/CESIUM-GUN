import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const cesiumBuildPath = 'node_modules/cesium/Build/Cesium'

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			dev: !production,
			css: css => {
				css.write('public/build/bundle.css');
			},
			preprocess: sveltePreprocess(),
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		postcss({
			extensions: [ '.css' ]
		}),
		copy({
			targets: [
				{ src: path.join(cesiumBuildPath, 'Assets'), dest: 'public/build/' },
				{ src: path.join(cesiumBuildPath, 'ThirdParty'), dest: 'public/build/' },
				{ src: path.join(cesiumBuildPath, 'Widgets'), dest: 'public/build/' },
				{ src: path.join(cesiumBuildPath, 'Workers'), dest: 'public/build/' },
			]
		}),
		commonjs(),
		typescript({ sourceMap: !production }),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}