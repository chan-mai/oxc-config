import { tsFiles } from './globs.js';
import { jsRules } from './javascript.js';

import type { DummyRuleMap, OxlintConfig } from 'oxlint';

export const tsRules: DummyRuleMap = {
	'typescript/no-explicit-any': ['warn'],
	'typescript/no-require-imports': ['warn', { allowAsImport: true }],
	'typescript/no-inferrable-types': ['warn'],
	'typescript/no-non-null-assertion': ['warn'],
	'typescript/explicit-function-return-type': ['off'],
	'typescript/consistent-type-imports': 'off',
	'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
};

// 型情報必須
export const tsTypeAwareRules: DummyRuleMap = {
	'typescript/no-unnecessary-condition': ['warn'],
	'typescript/no-misused-promises': ['warn', { checksVoidReturn: false }],
	'typescript/prefer-nullish-coalescing': ['warn'],
	// Not implemented yet in tsgolint
	// 'typescript/naming-convention': [
	// 	'error',
	// 	{
	// 		'selector': 'typeLike',
	// 		'format': ['PascalCase'],
	// 	},
	// 	{
	// 		'selector': 'typeParameter',
	// 		'format': [],
	// 	},
	// ],
};

export function tsConfig(typeAware: boolean): OxlintConfig {
	return {
		overrides: [
			{
				files: tsFiles,
				rules: {
					...jsRules,
					...tsRules,
					...(typeAware ? tsTypeAwareRules : {}),
				},
			},
		],
	};
}
