import { useState } from 'react';

export const initialValue = 0;

export function useConditional(enabled: boolean): number {
	if (!enabled) {
		return initialValue;
	}
	const [value] = useState(initialValue);
	return value;
}
