import { defineOxlintConfig } from './built/index.mjs';

export default defineOxlintConfig({
	overrides: {
		ignorePatterns: ['built/**/*'],
	},
});
