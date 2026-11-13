import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['test/**/*.test.ts'],
		exclude: ['test/fixtures/**'],
		globalSetup: ['test/setup.ts'],
		testTimeout: 120_000,
		hookTimeout: 120_000,
	},
});
