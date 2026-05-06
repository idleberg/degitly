import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node20',
		clean: isProduction,
		deps: {
			neverBundle: ['../package.json'],
		},
		dts: isProduction,
		entry: ['src/index.ts'],
		format: 'esm',
		minify: isProduction,
		outDir: 'bin',
		platform: 'node',
	};
});
