import type { OxlintConfig } from 'oxlint';

// wranglerのmain既定
export const workersDefaultEntryFiles = ['**/src/index.{ts,js}'];

export function workersConfig(entry: string[]): OxlintConfig {
	return {
		overrides: [
			{
				files: entry,
				rules: {
					'import/no-default-export': 'off',
				},
			},
		],
	};
}
