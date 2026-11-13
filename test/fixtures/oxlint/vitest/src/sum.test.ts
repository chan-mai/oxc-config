import { describe, expect, it } from 'vitest';

import { sum } from './sum';

describe('sum', () => {
	it.only('adds two numbers', () => {
		expect(sum(1, 2)).toBe(3);
	});

	it('has no assertion', () => {
		sum(1, 2);
	});
});
