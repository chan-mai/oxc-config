import { defineOxfmtConfig } from '@chan-mai/oxc-config';

export default defineOxfmtConfig({
	features: {
		tailwindcss: { stylesheet: './app.css' },
	},
	overrides: {
		ignorePatterns: ['expected/**'],
	},
});
