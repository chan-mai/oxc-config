import { expect, it } from 'vitest';
import { fixtureDir, runBin } from './helpers.js';

it('resolves exported types from the installed package', () => {
	const result = runBin(fixtureDir('types'), 'tsc', ['--noEmit']);
	expect(result.stdout + result.stderr).toBe('');
	expect(result.status).toBe(0);
});
