import { jsFiles } from './globs.js';

import type { DummyRuleMap, OxlintConfig } from 'oxlint';

export const jsRules: DummyRuleMap = {
	// TODO: path aliasを使わないとwarnする
	// 'no-restricted-imports': ['warn', {
	// 	'patterns': [
	// 	],
	// }],
	eqeqeq: ['error', 'always', { null: 'ignore' }],
	'no-var': ['error'],
	'prefer-arrow-callback': ['error'],
	'no-throw-literal': ['error'],
	'no-param-reassign': ['warn'],
	'no-constant-condition': ['warn'],
	'no-empty-pattern': ['warn'],
	'no-async-promise-executor': ['error'],
	'no-useless-escape': ['off'],
	'no-control-regex': ['warn'],
	'no-empty': ['warn'],
	'no-inner-declarations': ['off'],
	'no-sparse-arrays': ['off'],
	'no-unused-vars': [
		'warn',
		{
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
			caughtErrorsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
		},
	],
	'import/no-default-export': ['warn'],
};

export function jsConfig(): OxlintConfig {
	return {
		overrides: [
			{
				files: jsFiles,
				rules: jsRules,
			},
		],
	};
}
