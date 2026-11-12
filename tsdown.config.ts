import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		'oxlint/index': 'src/oxlint/index.ts',
		'oxfmt/index': 'src/oxfmt/index.ts',
	},
	outDir: 'built',
	dts: true,
});
