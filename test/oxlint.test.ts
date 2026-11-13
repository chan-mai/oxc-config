import { beforeAll, describe, expect, it } from 'vitest';
import { fixtureDir, runOxlint, severityOf } from './helpers.js';

import type { LintResult } from './helpers.js';

// undefined: 報告なし
type Case = [filename: string, code: string, severity: 'error' | 'warning' | undefined];

interface Fixture {
	name: string;
	cases: Case[];
}

const fixtures: Fixture[] = [
	{
		name: 'default',
		cases: [
			['src/syntax.ts', 'eslint(no-var)', 'error'],
			['src/syntax.ts', 'eslint(eqeqeq)', 'error'],
			['src/legacy.js', 'eslint(no-var)', 'error'],
			['src/legacy.js', 'import(no-default-export)', 'warning'],
			['src/default-export.ts', 'import(no-default-export)', 'warning'],
			['src/type-import.ts', 'import(consistent-type-specifier-style)', 'error'],
			['src/nullish.ts', 'typescript(prefer-nullish-coalescing)', 'warning'],
			['tool.config.ts', 'import(no-default-export)', undefined],
			['oxlint.config.ts', 'import(no-default-export)', undefined],
		],
	},
	{
		name: 'no-type-aware',
		cases: [
			['src/syntax.ts', 'eslint(eqeqeq)', 'error'],
			['src/nullish.ts', 'typescript(prefer-nullish-coalescing)', undefined],
		],
	},
	{
		name: 'overrides',
		cases: [
			['src/syntax.ts', 'eslint(no-var)', 'error'],
			['src/legacy/syntax.ts', 'eslint(no-var)', undefined],
			['src/legacy/syntax.ts', 'eslint(eqeqeq)', 'error'],
			['generated/syntax.ts', 'eslint(eqeqeq)', undefined],
		],
	},
	{
		name: 'vitest',
		cases: [
			['src/sum.test.ts', 'vitest(no-focused-tests)', 'warning'],
			['src/sum.test.ts', 'vitest(expect-expect)', 'warning'],
			['vitest.config.ts', 'import(no-default-export)', undefined],
		],
	},
	{
		name: 'vue',
		cases: [
			['src/App.vue', 'eslint(eqeqeq)', 'error'],
			['src/App.vue', 'eslint(no-unused-vars)', undefined],
			['src/components/Counter.vue', 'import(no-default-export)', undefined],
			['src/composables/useToggle.ts', 'import(no-default-export)', 'warning'],
		],
	},
	{
		name: 'nuxt',
		cases: [
			['app/composables/useCounter.ts', 'import(no-default-export)', 'warning'],
			['app/utils/displayName.ts', 'typescript(prefer-nullish-coalescing)', 'warning'],
			['app/app.config.ts', 'import(no-default-export)', undefined],
			['app/middleware/auth.ts', 'import(no-default-export)', undefined],
			['app/plugins/logger.ts', 'import(no-default-export)', undefined],
			['server/api/hello.ts', 'import(no-default-export)', undefined],
			['nuxt.config.ts', 'import(no-default-export)', undefined],
		],
	},
	{
		name: 'react',
		cases: [
			['src/hooks/useConditional.ts', 'react-hooks(rules-of-hooks)', 'error'],
			['src/hooks/useConditional.ts', 'react(only-export-components)', undefined],
			['src/components/Counter.tsx', 'react-hooks(exhaustive-deps)', 'warning'],
			['src/components/Counter.tsx', 'react(only-export-components)', 'warning'],
		],
	},
	{
		name: 'next',
		cases: [
			['components/Footer.tsx', 'import(no-default-export)', 'warning'],
			['components/Card.tsx', 'react(only-export-components)', 'warning'],
			['app/layout.tsx', 'import(no-default-export)', undefined],
			['app/layout.tsx', 'react(only-export-components)', undefined],
			['app/page.tsx', 'import(no-default-export)', undefined],
			['app/blog/[slug]/page.tsx', 'import(no-default-export)', undefined],
			['app/blog/[slug]/page.tsx', 'react(only-export-components)', undefined],
			['pages/legacy.tsx', 'import(no-default-export)', undefined],
			['middleware.ts', 'import(no-default-export)', undefined],
			['next.config.ts', 'import(no-default-export)', undefined],
		],
	},
];

describe.each(fixtures)('oxlint: $name', ({ name, cases }) => {
	let result: LintResult;

	beforeAll(() => {
		result = runOxlint(fixtureDir('oxlint', name));
	});

	it('writes nothing to stderr', () => {
		expect(result.stderr).toBe('');
	});

	it.each(cases)('%s: %s -> %s', (filename, code, severity) => {
		expect(severityOf(result.diagnostics, filename, code)).toBe(severity);
	});

	it('matches snapshot', () => {
		expect(result.diagnostics).toMatchSnapshot();
	});
});

describe('oxlint: unused disable directive', () => {
	it('is reported as warning', () => {
		const { diagnostics } = runOxlint(fixtureDir('oxlint', 'default'));
		const found = diagnostics.filter(d => d.filename === 'src/disable-directive.ts');
		expect(found).toEqual([
			expect.objectContaining({ severity: 'warning', message: expect.stringContaining('Unused oxlint-disable directive') }),
		]);
	});
});
