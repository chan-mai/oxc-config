export function titleOf(title: string): string {
	return title.toUpperCase();
}

export function Card({ title }: { title: string }) {
	return <section>{titleOf(title)}</section>;
}
