export default function isAdmin(path: string): boolean {
	return path.startsWith('/admin');
}
