import { configFiles } from './globs.js';
import { jsConfig } from './javascript.js';
import { nextConfig } from './next.js';
import { nuxtConfig } from './nuxt.js';
import { reactConfig } from './react.js';
import { tsConfig } from './typescript.js';
import { vueConfig } from './vue.js';

import type { OxlintConfig } from 'oxlint';

type LintPlugin = NonNullable<OxlintConfig['plugins']>[number];

interface OxlintConfigOptions {
	features?: {
		/** Defaults to true */
		js?: boolean;
		/** Defaults to true */
		ts?: boolean;
		/** Defaults to true. Requires oxlint-tsgolint */
		typeAware?: boolean;
		/** Defaults to false. Enabled when nuxt is true */
		vue?: boolean;
		/** Defaults to false */
		nuxt?: boolean;
		/** Defaults to false. Enabled when next is true */
		react?: boolean;
		/** Defaults to false */
		next?: boolean;
	};
	overrides?: Partial<OxlintConfig>;
}

function defineOxlintConfig(opts: OxlintConfigOptions = {}): OxlintConfig {
	const f = opts.features ?? {};
	const js = f.js ?? true;
	const ts = f.ts ?? true;
	const typeAware = f.typeAware ?? true;
	const nuxt = f.nuxt ?? false;
	const vue = (f.vue ?? false) || nuxt;
	const next = f.next ?? false;
	const react = (f.react ?? false) || next;

	// 既定プラグイン + import
	const plugins: LintPlugin[] = ['eslint', 'typescript', 'unicorn', 'oxc', 'import'];
	if (vue) plugins.push('vue');
	if (react) plugins.push('react', 'jsx-a11y');
	if (next) plugins.push('nextjs');

	const configs: OxlintConfig[] = [];
	if (js) configs.push(jsConfig());
	if (ts) configs.push(tsConfig());
	if (vue) configs.push(vueConfig());
	if (nuxt) configs.push(nuxtConfig());
	if (react) configs.push(reactConfig());
	if (next) configs.push(nextConfig());
	// 言語別設定より後に適用
	configs.push({
		overrides: [
			{
				// default export必須
				files: configFiles,
				rules: {
					'import/no-default-export': 'off',
				},
			},
		],
	});

	return {
		...opts.overrides,
		plugins: opts.overrides?.plugins ?? plugins,
		options: {
			typeAware,
			reportUnusedDisableDirectives: 'warn',
			...opts.overrides?.options,
		},
		extends: [...configs, ...(opts.overrides?.extends ?? [])],
	};
}

export { defineOxlintConfig };
export { jsRules as oxlintJsRules } from './javascript.js';
export { tsRules as oxlintTsRules } from './typescript.js';
export { vueRules as oxlintVueRules } from './vue.js';
export { reactRules as oxlintReactRules, reactJsxRules as oxlintReactJsxRules } from './react.js';

export type { OxlintConfigOptions };
