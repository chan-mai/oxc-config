import { defineOxlintConfig } from '@chan-mai/oxc-config';

export default defineOxlintConfig({
	features: {
		next: true,
	},
	overrides: {
		ignorePatterns: ['.next/**', 'next-env.d.ts'],
	},
});
