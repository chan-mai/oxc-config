import { vueFiles } from './globs.js';
import { jsRules } from './javascript.js';
import { tsRules } from './typescript.js';

import type { DummyRuleMap, OxlintConfig } from 'oxlint';

export const vueRules: DummyRuleMap = {
	// template内の参照を解析しないため誤検知
	'no-unused-vars': 'off',
	'import/no-default-export': 'off',
};

export function vueConfig(): OxlintConfig {
	return {
		overrides: [
			{
				files: vueFiles,
				rules: {
					...jsRules,
					...tsRules,
					...vueRules,
				},
			},
		],
	};
}
