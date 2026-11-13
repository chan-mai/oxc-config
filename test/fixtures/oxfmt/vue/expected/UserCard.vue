<script lang="ts">
export interface User {
	id: number;
	name: string;
	email?: string;
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<{ user: User; compact?: boolean }>(), { compact: false });
const label = computed(() => (props.compact ? props.user.name : `${props.user.name} <${props.user.email ?? 'no email'}>`));
</script>
<template>
	<article :class="['user-card', { 'user-card--compact': compact }]">
		<p class="user-card__name" :title="user.email ?? user.name" data-testid="user-card-name" aria-live="polite" role="status">
			{{ label }}
		</p>
	</article>
</template>
<style lang="scss" scoped>
.user-card {
	padding: 4px;
	&--compact {
		padding: 0;
	}
}
</style>
