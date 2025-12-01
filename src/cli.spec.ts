import { tmpdir } from 'node:os';
import process from 'node:process';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from './log.ts';

vi.mock('./log.ts', () => ({
	logger: {
		log: vi.fn(),
		debug: vi.fn(),
		error: vi.fn(),
	},
}));

vi.mock('./utils.ts', () => ({
	getVersion: vi.fn().mockResolvedValue('1.0.0'),
}));

describe('handleCli', () => {
	const originalArgv = process.argv;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.resetModules();
		process.argv = ['node', 'degitly'];
	});

	afterEach(() => {
		process.argv = originalArgv;
		vi.restoreAllMocks();
	});

	it('should parse repository argument', async () => {
		process.argv = ['node', 'degitly', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.args[0]).toBe('user/repo');
	});

	it('should parse repository and directory arguments', async () => {
		process.argv = ['node', 'degitly', 'user/repo', 'output-dir'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.args[0]).toBe('user/repo');
		expect(result.args[1]).toBe('output-dir');
	});

	it('should parse debug flag', async () => {
		process.argv = ['node', 'degitly', '-D', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.debug).toBe(true);
	});

	it('should default debug to false', async () => {
		process.argv = ['node', 'degitly', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.debug).toBe(false);
	});

	it('should parse cache flag', async () => {
		process.argv = ['node', 'degitly', '-c', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.cache).toBe(true);
	});

	it('should default cache to false', async () => {
		process.argv = ['node', 'degitly', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.cache).toBe(false);
	});

	it('should parse force flag', async () => {
		process.argv = ['node', 'degitly', '-f', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.force).toBe(true);
	});

	it('should default force to false', async () => {
		process.argv = ['node', 'degitly', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.force).toBe(false);
	});

	it('should parse exclude option with single file', async () => {
		process.argv = ['node', 'degitly', 'user/repo', '-x', 'README.md'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.exclude).toEqual(['README.md']);
	});

	it('should parse exclude option with multiple files', async () => {
		process.argv = ['node', 'degitly', 'user/repo', '-x', 'README.md', 'LICENSE', '.gitignore'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.exclude).toEqual(['README.md', 'LICENSE', '.gitignore']);
	});

	it('should parse host option', async () => {
		process.argv = ['node', 'degitly', '-h', 'git.example.com', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.host).toBe('git.example.com');
	});

	it('should parse proxy option', async () => {
		process.argv = ['node', 'degitly', '-p', 'http://proxy.example.com:8080', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.proxy).toBe('http://proxy.example.com:8080');
	});

	it('should parse temp option', async () => {
		process.argv = ['node', 'degitly', '-t', '/custom/temp', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.temp).toBe('/custom/temp');
	});

	it('should default temp to tmpdir()', async () => {
		process.argv = ['node', 'degitly', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		const result = await handleCli();

		expect(result.options.temp).toBe(tmpdir());
	});

	it('should use logger.log for help output', async () => {
		process.argv = ['node', 'degitly', '--help'];
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

		const { handleCli } = await import('./cli.ts');

		try {
			await handleCli();
		} catch {
			// Commander calls process.exit after --help
		}

		expect(logger.log).toHaveBeenCalled();
		expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
		exitSpy.mockRestore();
	});

	it('should use logger.error for error messages', async () => {
		process.argv = ['node', 'degitly']; // Missing required repository argument
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

		const { handleCli } = await import('./cli.ts');

		try {
			await handleCli();
		} catch {
			// Commander calls process.exit on error
		}

		expect(logger.error).toHaveBeenCalled();
		exitSpy.mockRestore();
	});

	it('should log debug output when debug flag is set', async () => {
		process.argv = ['node', 'degitly', '-D', 'user/repo'];

		const { handleCli } = await import('./cli.ts');
		await handleCli();

		expect(logger.debug).toHaveBeenCalled();
	});
});
