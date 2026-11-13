<script setup lang="ts">
import { ref } from 'vue';

import Counter from './components/Counter.vue';

const title = 'Counter';
const count = ref(0);

function reset(): void {
	if (count.value == 10) {
		count.value = 0;
	}
}
</script>

<template>
	<h1>{{ title }}</h1>
	<Counter :count="count" @click="reset" />
</template>
