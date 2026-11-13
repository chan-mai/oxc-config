<script setup lang="ts">
const { data } = await useFetch<{ id: number; title: string }[]>('/api/todos');
const heading = 'Todos';
const count = computed(() => data.value?.length ?? 0);

if (count.value == 0) {
	console.log('empty');
}
</script>

<template>
	<main>
		<h1>{{ heading }} ({{ count }})</h1>
		<ul>
			<li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
		</ul>
	</main>
</template>

<style scoped>
main {
	padding: 16px;
}
</style>
