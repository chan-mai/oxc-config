import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import type { TestProject } from 'vitest/node';

declare module 'vitest' {
	export interface ProvidedContext {
		workspaceDir: string;
	}
}

const root = resolve(import.meta.dirname, '..');
const fixturesDir = join(root, 'test/fixtures');
const toolPackages = ['oxlint', 'oxfmt', 'oxlint-tsgolint', 'typescript'];
// lint, 整形に不要なbuild script
const deniedBuilds = ['esbuild'];

interface PackageJson {
	name?: string;
	devDependencies?: Record<string, string>;
}

function readJson(path: string): PackageJson {
	return JSON.parse(readFileSync(path, 'utf8')) as PackageJson;
}

function run(cmd: string, args: string[], cwd: string): string {
	return execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
}

function findProjects(dir: string): string[] {
	const entries = readdirSync(dir, { withFileTypes: true });
	if (entries.some(e => e.isFile() && e.name === 'package.json')) return [dir];
	return entries.filter(e => e.isDirectory()).flatMap(e => findProjects(join(dir, e.name)));
}

function prepareWorkspace(tmp: string): string {
	const workspace = join(tmp, 'workspace');

	run('pnpm', ['pack', '--pack-destination', tmp], root);
	const tarball = readdirSync(tmp).find(f => f.endsWith('.tgz'));
	if (!tarball) throw new Error('pnpm pack did not produce a tarball');

	cpSync(fixturesDir, workspace, { recursive: true });

	const rootDevDeps = readJson(join(root, 'package.json')).devDependencies ?? {};
	const projects = findProjects(workspace);
	for (const dir of projects) {
		const pkgPath = join(dir, 'package.json');
		const pkg = readJson(pkgPath);
		const devDependencies: Record<string, string> = { ...pkg.devDependencies, '@chan-mai/oxc-config': `file:${join(tmp, tarball)}` };
		for (const name of toolPackages) {
			const version = rootDevDeps[name];
			if (!version) throw new Error(`${name} is missing from root devDependencies`);
			devDependencies[name] = version;
		}
		writeFileSync(pkgPath, `${JSON.stringify({ ...pkg, devDependencies }, null, '\t')}\n`);
	}

	const packages = projects.map(dir => `  - '${dir.slice(workspace.length + 1)}'`).join('\n');
	const rootWorkspaceYaml = readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8');
	const allowBuilds = deniedBuilds.map(name => `  ${name}: false`).join('\n');
	writeFileSync(join(workspace, 'pnpm-workspace.yaml'), `packages:\n${packages}\nallowBuilds:\n${allowBuilds}\n${rootWorkspaceYaml}`);

	run('pnpm', ['install', '--prefer-offline'], workspace);
	run('pnpm', ['exec', 'nuxt', 'prepare'], join(workspace, 'oxlint/nuxt'));

	return workspace;
}

export function setup(project: TestProject): () => void {
	const tmp = mkdtempSync(join(tmpdir(), 'oxc-config-test-'));
	const teardown = (): void => {
		if (process.env.OXC_CONFIG_TEST_KEEP === '1') {
			console.log(`Kept test workspace: ${tmp}`);
			return;
		}
		rmSync(tmp, { recursive: true, force: true });
	};

	try {
		project.provide('workspaceDir', prepareWorkspace(tmp));
	} catch (error) {
		teardown();
		throw error;
	}
	return teardown;
}
