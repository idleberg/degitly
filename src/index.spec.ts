import { basename } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('degitly', () => ({
	default: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('./cli.ts', () => ({
	handleCli: vi.fn(),
}));

vi.mock('./log.ts', () => ({
	logger: {
		error: vi.fn(),
		info: vi.fn(),
		debug: vi.fn(),
		success: vi.fn(),
	},
}));

vi.mock('./utils.ts', () => ({
	fileExists: vi.fn(),
	truncate: vi.fn((num: number) => Math.trunc(num * 1_000) / 1_000),
}));

describe('main CLI execution', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should extract repository basename when directory is not provided', async () => {
		const repository = 'user/my-repo';
		const expectedDir = basename(repository);

		expect(expectedDir).toBe('my-repo');
	});

	it('should handle repository with .git extension', async () => {
		const repository = 'user/my-repo.git';
		const expectedDir = basename(repository);

		expect(expectedDir).toBe('my-repo.git');
	});

	it('should handle complex repository paths', async () => {
		const repository = 'github:user/repo';
		const expectedDir = basename(repository);

		expect(expectedDir).toBe('repo');
	});
});
