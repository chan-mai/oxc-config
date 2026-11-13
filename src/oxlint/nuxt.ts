import type { OxlintConfig } from 'oxlint';

// Nuxt, Nitroがdefault exportを読み込むファイル
export const nuxtDefaultExportFiles = [
	'**/pages/**',
	'**/layouts/**',
	// 直下と*/indexのみ読込
	'**/{middleware,plugins,modules}/*',
	'**/{middleware,plugins,modules}/*/index.*',
	'**/server/{api,routes,middleware,plugins,tasks,modules}/**',
	// @nuxtjs/i18nのlangDir
	'**/i18n/locales/**',
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
