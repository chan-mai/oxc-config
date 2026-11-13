<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import TodoItem from './TodoItem.vue';

import type { Todo } from '~/types/todo';

const props = defineProps<{ todos: Todo[]; title?: string }>();
const emit = defineEmits<{ (e: 'toggle', id: number): void }>();
const filter = ref<'all' | 'done'>('all');
const route = useRoute();
const visible = computed(() => props.todos.filter(todo => filter.value === 'all' || todo.done));
</script>

<template>
	<section class="todo-list" :data-route="route.path">
		<h2 v-if="title">{{ title }}</h2>
		<ul>
			<TodoItem v-for="todo in visible" :key="todo.id" :todo="todo" @toggle="emit('toggle', todo.id)" class="todo-list__item" />
		</ul>
		<button type="button" @click="filter = filter === 'all' ? 'done' : 'all'">{{ filter }}</button>
	</section>
</template>

<style scoped>
.todo-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.todo-list__item:hover {
	color: red;
}
</style>
