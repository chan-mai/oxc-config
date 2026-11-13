import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fixtureDir, runBin } from './helpers.js';

const sourceFixtures = resolve(import.meta.dirname, 'fixtures/oxfmt');

describe.each(['default', 'tailwindcss', 'vue'])('oxfmt: %s', name => {
	it('formats input into expected', () => {
		const dir = fixtureDir('oxfmt', name);
		const result = runBin(dir, 'oxfmt', ['input']);
		expect(result.status, result.stderr).toBe(0);

		const expectedDir = join(sourceFixtures, name, 'expected');
		const files = readdirSync(expectedDir);
		expect(files.length).toBeGreaterThan(0);
		for (const file of files) {
			const actual = readFileSync(join(dir, 'input', file), 'utf8');
			expect(actual, file).toBe(readFileSync(join(expectedDir, file), 'utf8'));
		}
	});
});
