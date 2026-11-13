<script setup lang="ts">
const props = defineProps<{ label: string; count: number }>();

const overflow = props.count > 99;
</script>

<template>
	<span class="badge">{{ props.label }}: {{ overflow ? '99+' : props.count }}</span>
</template>

<style scoped>
.badge {
	border-radius: 9999px;
}
</style>
