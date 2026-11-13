export default defineTask({
	meta: { name: 'db:migrate' },
	run() {
		return { result: 'ok' };
	},
});
