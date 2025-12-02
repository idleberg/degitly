#!/usr/bin/env node

import { basename, resolve } from 'node:path';
import gitly from 'gitly';
import { handleCli } from './cli.ts';
import { logger } from './log.ts';
import { fileExists, truncate } from './utils.ts';

(async function main() {
	const { args, options } = await handleCli();

	const [repository, directory] = args;
	const project =
		directory ??
		basename(repository as string)
			.split('#')
			.at(0);
	const outdir = resolve(process.cwd(), project as string);

	if ((await fileExists(outdir)) && options.force === false) {
		logger.error('Output directory is not empty, use --force to overwrite');
		process.exit(1);
	}

	if (options.debug) {
		logger.debug({ repository, outdir });
	}

	const startTime = performance.now();

	logger.info(`Downloading tarball for "${repository}"`);

	try {
		await gitly(repository as string, outdir, {
			...options,
			throw: true,
			extract: options.exclude.length
				? {
						filter(info) {
							const [_rootDir, ...fragments] = info.split('/');
							const filePath = fragments.join('/');

							const filterFile = options.exclude?.includes(filePath) && info.endsWith(`/${filePath}`);

							if (filterFile) {
								logger.info(`Excluding "${filePath}"`);
							}

							return !filterFile;
						},
					}
				: undefined,
		});
	} catch (error) {
		const errorMessage = (error as Error).message.replace(/\[gitly:\w+\]:\s/, '');

		logger.error(`Error: ${errorMessage}`);
		process.exit(1);
	}
	logger.info(`Extracted files to "${outdir}"`);

	const endTime = performance.now();

	logger.success(`Completed in ${truncate(endTime - startTime)}ms`);
})();
