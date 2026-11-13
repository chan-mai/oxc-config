import type { User } from './types';

export function createUser(name: string): User {
	return { name };
}
