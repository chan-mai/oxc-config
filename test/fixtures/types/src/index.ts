import { defineOxfmtConfig, defineOxlintConfig } from '@chan-mai/oxc-config';
import { defineOxfmtConfig as defineOxfmtConfigFromSubpath } from '@chan-mai/oxc-config/oxfmt';
import { defineOxlintConfig as defineOxlintConfigFromSubpath, oxlintJsRules, oxlintTsRules } from '@chan-mai/oxc-config/oxlint';

import type { OxfmtConfigOptions, OxlintConfigOptions } from '@chan-mai/oxc-config';
import type { OxfmtConfig } from 'oxfmt';
import type { OxlintConfig } from 'oxlint';

const lintOptions: OxlintConfigOptions = {
	features: { nuxt: true, vitest: true },
	overrides: { ignorePatterns: ['.nuxt/**'] },
};
const fmtOptions: OxfmtConfigOptions = {
	features: { tailwindcss: { stylesheet: './app.css' } },
};

export const lint: OxlintConfig = defineOxlintConfig(lintOptions);
export const lintFromSubpath: OxlintConfig = defineOxlintConfigFromSubpath();
export const fmt: OxfmtConfig = defineOxfmtConfig(fmtOptions);
export const fmtFromSubpath: OxfmtConfig = defineOxfmtConfigFromSubpath();
export const rules = { ...oxlintJsRules, ...oxlintTsRules };

// @ts-expect-error unknown feature
defineOxlintConfig({ features: { svelte: true } });

// @ts-expect-error invalid option type
defineOxfmtConfig({ overrides: { useTabs: 'yes' } });
