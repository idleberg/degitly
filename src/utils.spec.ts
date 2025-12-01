import { mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fileExists, getVersion, truncate } from './utils.ts';

describe('fileExists', () => {
	const testDir = join(tmpdir(), `degitly-test-${Date.now()}`);
	const testFile = join(testDir, 'test-file.txt');

	beforeEach(async () => {
		await mkdir(testDir, { recursive: true });
	});

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true });
	});

	it('should return true for existing file', async () => {
		await writeFile(testFile, 'test content');
		const exists = await fileExists(testFile);

		expect(exists).toBe(true);
	});

	it('should return false for non-existing file', async () => {
		const exists = await fileExists(join(testDir, 'non-existent.txt'));

		expect(exists).toBe(false);
	});

	it('should return true for existing directory', async () => {
		const exists = await fileExists(testDir);

		expect(exists).toBe(true);
	});

	it('should return false for non-existing directory', async () => {
		const exists = await fileExists(join(testDir, 'non-existent-dir'));

		expect(exists).toBe(false);
	});
});

describe('getVersion', () => {
	it('should return version from package.json', async () => {
		const version = await getVersion();

		expect(version).toMatch(/^\d+\.\d+\.\d+/);
	});

	it('should return a string', async () => {
		const version = await getVersion();

		expect(typeof version).toBe('string');
	});
});

describe('truncate', () => {
	it('should truncate decimal numbers to 3 decimal places', () => {
		expect(truncate(123.456789)).toBe(123.456);
	});

	it('should handle whole numbers', () => {
		expect(truncate(100)).toBe(100);
	});

	it('should handle numbers with fewer than 3 decimal places', () => {
		expect(truncate(42.5)).toBe(42.5);
	});

	it('should truncate (not round) numbers', () => {
		expect(truncate(1.9999)).toBe(1.999);
		expect(truncate(2.9996)).toBe(2.999);
	});

	it('should handle negative numbers', () => {
		expect(truncate(-123.456789)).toBe(-123.456);
	});

	it('should handle zero', () => {
		expect(truncate(0)).toBe(0);
	});

	it('should handle very small numbers', () => {
		expect(truncate(0.000123456)).toBe(0);
	});

	it('should handle very large numbers', () => {
		expect(truncate(123456789.987654)).toBe(123456789.987);
	});
});
