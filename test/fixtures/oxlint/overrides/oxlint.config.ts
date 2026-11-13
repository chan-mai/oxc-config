import { defineOxlintConfig } from '@chan-mai/oxc-config';

export default defineOxlintConfig({
	features: {
		typeAware: false,
	},
	overrides: {
		ignorePatterns: ['generated/**'],
		overrides: [
			{
				files: ['src/legacy/**'],
				rules: {
					'no-var': 'off',
				},
			},
		],
	},
});
