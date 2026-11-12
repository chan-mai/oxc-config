import type { OxlintConfig } from 'oxlint';

const ext = '{js,jsx,ts,tsx}';

// Next.jsがdefault exportを読み込むファイル
export const nextDefaultExportFiles = [
	`**/app/**/{page,layout,loading,error,global-error,not-found,global-not-found,forbidden,unauthorized,template,default,route}.${ext}`,
	`**/app/**/{opengraph-image,twitter-image,icon,apple-icon,sitemap,robots,manifest}.${ext}`,
	`**/pages/**/*.${ext}`,
	`**/{middleware,proxy}.{js,ts}`,
];

export function nextConfig(): OxlintConfig {
	return {
		overrides: [
			{
				files: nextDefaultExportFiles,
				rules: {
					'import/no-default-export': 'off',
					// page等のdefault export対象
					'react/only-export-components': 'off',
				},
			},
		],
	};
}
