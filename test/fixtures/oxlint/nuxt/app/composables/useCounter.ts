export function useCounter(): { count: Ref<number>; increment: () => void } {
	const count = ref(0);
	return { count, increment: () => count.value++ };
}

export default useCounter;
