export default defineNuxtPlugin(() => {
	return {
		provide: {
			log: (message: string) => console.log(message),
		},
	};
});
