import { defineOxlintConfig } from '@chan-mai/oxc-config';

export default defineOxlintConfig({
	features: {
		nuxt: true,
	},
	overrides: {
		ignorePatterns: ['.nuxt/**', '.output/**'],
	},
});
