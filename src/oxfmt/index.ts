import type { OxfmtConfig } from 'oxfmt';

interface OxfmtConfigOptions {
	overrides?: Partial<OxfmtConfig>;
}

export const oxfmtBaseConfig: OxfmtConfig = {
	useTabs: true,
	singleQuote: true,
	semi: true,
	printWidth: 140,
	arrowParens: 'avoid',
	sortImports: {
		newlinesBetween: false,
		groups: [
			'builtin',
			'external',
			['internal', 'subpath'],
			'parent',
			'sibling',
			'index',
			'style',
			'unknown',
			{ newlinesBetween: true },
			'type',
		],
		// Nuxtのエイリアス含む
		internalPattern: ['~/', '~~/', '@/', '@@/', '#'],
	},
};

function defineOxfmtConfig(opts: OxfmtConfigOptions = {}): OxfmtConfig {
	return {
		...oxfmtBaseConfig,
		...opts.overrides,
		ignorePatterns: [...(oxfmtBaseConfig.ignorePatterns ?? []), ...(opts.overrides?.ignorePatterns ?? [])],
	};
}

export { defineOxfmtConfig };

export type { OxfmtConfigOptions };
