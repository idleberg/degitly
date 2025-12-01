import { tmpdir } from 'node:os';
import { Command } from 'commander';
import { logger } from './log.ts';
import { getVersion } from './utils.ts';

/**
 * Handles parsing of CLI arguments.
 * @internal
 */
export async function handleCli() {
	const program = new Command('degitly');

	program
		.version(await getVersion())
		.configureOutput({
			writeOut: (message: string) => logger.log(message),
			writeErr: (message: string) => logger.error(message),
		})
		.argument('<repository>')
		.argument('[directory]', 'set an output directory')
		.option('-D, --debug', 'print additional debug output', false)
		.optionsGroup('degitly Options')
		.option('-c, --cache', 'use cache only', false)
		.option('-x, --exclude <file...>', 'exclude files from extraction', [])
		.option('-f, --force', 'allow overwriting existing directory', false)
		.option('-h, --host <hostname>', 'specify a host for the repository')
		.option('-p, --proxy <url>', 'set proxy server')
		.option('-t, --temp <directory>', 'set cache directory', tmpdir());

	program.parse();

	const args = program.args;
	const options = program.opts();

	if (options.debug) {
		logger.debug({ args, options });
	}

	return {
		args,
		options,
	};
}
