import { jsFiles, jsxFiles, tsFiles } from './globs.js';

import type { DummyRuleMap, OxlintConfig } from 'oxlint';

export const reactRules: DummyRuleMap = {
	'react/rules-of-hooks': 'error',
	'react/exhaustive-deps': 'warn',
};

export const reactJsxRules: DummyRuleMap = {
	'react/only-export-components': ['warn', { allowConstantExport: true }],
};

export function reactConfig(): OxlintConfig {
	return {
		overrides: [
			{
				files: [...jsFiles, ...tsFiles],
				rules: reactRules,
			},
			{
				files: jsxFiles,
				rules: reactJsxRules,
			},
		],
	};
}
