import { defineOxfmtConfig } from './built/index.mjs';

export default defineOxfmtConfig({
	overrides: {
		ignorePatterns: ['built/**/*', 'pnpm-lock.yaml', 'test/fixtures/**/*'],
	},
});
