import type { OxfmtConfig } from 'oxfmt';

interface OxfmtConfigOptions {
	features?: {
		/** Defaults to false. Pass an object to configure sortTailwindcss */
		tailwindcss?: OxfmtConfig['sortTailwindcss'];
	};
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
		...(opts.features?.tailwindcss ? { sortTailwindcss: opts.features.tailwindcss } : {}),
		...opts.overrides,
		ignorePatterns: [...(oxfmtBaseConfig.ignorePatterns ?? []), ...(opts.overrides?.ignorePatterns ?? [])],
	};
}

export { defineOxfmtConfig };

export type { OxfmtConfigOptions };
