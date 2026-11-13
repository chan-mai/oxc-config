import { useEffect, useState } from 'react';

export function formatCount(count: number): string {
	return `${count} times`;
}

export function Counter({ label }: { label: string }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `${label}: ${formatCount(count)}`;
	}, []);

	return (
		<button type="button" onClick={() => setCount(count + 1)}>
			{label}
		</button>
	);
}
