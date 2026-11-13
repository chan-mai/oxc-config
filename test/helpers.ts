import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { inject } from 'vitest';

export interface Diagnostic {
	filename: string;
	code: string;
	severity: string;
	message: string;
	line: number;
	column: number;
}

interface RawDiagnostic {
	filename: string;
	// 不要な無効化コメントの診断では未設定
	code?: string;
	severity: string;
	message: string;
	labels: { span: { line: number; column: number } }[];
}

export interface CommandResult {
	status: number | null;
	stdout: string;
	stderr: string;
}

export interface LintResult {
	diagnostics: Diagnostic[];
	stderr: string;
}

export function fixtureDir(...path: string[]): string {
	return join(inject('workspaceDir'), ...path);
}

export function runBin(dir: string, bin: string, args: string[]): CommandResult {
	const result = spawnSync(join(dir, 'node_modules/.bin', bin), args, { cwd: dir, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
	if (result.error) throw result.error;
	return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

export function runOxlint(dir: string): LintResult {
	const result = runBin(dir, 'oxlint', ['-f', 'json']);
	// 1: error診断あり
	if (result.status !== 0 && result.status !== 1) {
		throw new Error(`oxlint exited with ${String(result.status)}\n${result.stdout}\n${result.stderr}`);
	}
	const { diagnostics } = JSON.parse(result.stdout) as { diagnostics: RawDiagnostic[] };
	const normalized = diagnostics
		.map(d => ({
			filename: d.filename,
			code: d.code ?? '',
			severity: d.severity,
			message: d.message,
			line: d.labels[0]?.span.line ?? 0,
			column: d.labels[0]?.span.column ?? 0,
		}))
		.sort((a, b) => a.filename.localeCompare(b.filename) || a.line - b.line || a.column - b.column || a.code.localeCompare(b.code));
	return { diagnostics: normalized, stderr: result.stderr };
}

export function severityOf(diagnostics: Diagnostic[], filename: string, code: string): string | undefined {
	return diagnostics.find(d => d.filename === filename && d.code === code)?.severity;
}
