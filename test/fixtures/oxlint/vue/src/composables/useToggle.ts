import { ref } from 'vue';

import type { Ref } from 'vue';

export default function useToggle(initial: boolean): [Ref<boolean>, () => void] {
	const state = ref(initial);
	return [state, () => (state.value = !state.value)];
}
