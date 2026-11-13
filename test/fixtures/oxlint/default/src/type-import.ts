import { type User } from './types';

export function nameOf(user: User): string {
	return user.name;
}
