import type { OxlintConfig } from 'oxlint';

// Nuxtがdefault exportを読み込むファイル
export const nuxtDefaultExportFiles = [
	'**/pages/**',
	'**/layouts/**',
	'**/middleware/**',
	'**/plugins/**',
	'**/server/**',
	'**/modules/**',
	'**/app.config.ts',
	'**/router.options.ts',
];

export function nuxtConfig(): OxlintConfig {
	return {
		overrides: [
			{
				files: nuxtDefaultExportFiles,
				rules: {
					'import/no-default-export': 'off',
				},
			},
		],
	};
}
