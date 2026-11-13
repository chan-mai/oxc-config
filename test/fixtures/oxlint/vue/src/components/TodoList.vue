<script setup lang="ts">
import { computed, ref } from 'vue';

interface Todo {
	id: number;
	title: string;
	done: boolean;
}

const props = defineProps<{ todos: Todo[]; owner?: string }>();
const emit = defineEmits<{ toggle: [id: number] }>();

const filter = ref<'all' | 'done'>('all');
const emptyMessage = 'No todos';
const ownerName = computed(() => props.owner || 'anonymous');
var visible = computed(() => props.todos.filter(todo => filter.value === 'all' || todo.done));
</script>

<template>
	<section class="todo-list">
		<h2>{{ ownerName }}</h2>
		<p v-if="visible.length === 0">{{ emptyMessage }}</p>
		<ul v-else>
			<li v-for="todo in visible" :key="todo.id" @click="emit('toggle', todo.id)">{{ todo.title }}</li>
		</ul>
	</section>
</template>

<style scoped>
.todo-list {
	display: flex;
	flex-direction: column;
}
</style>
