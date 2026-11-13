<script lang="ts">
import { type PropType } from 'vue';

export interface User {
	id: number;
	name: string;
}

export const userProp = { type: Object as PropType<User>, required: true } as const;
</script>

<script setup lang="ts">
const props = defineProps({ user: userProp });

const isFirst = props.user.id == 1;
</script>

<template>
	<article :class="{ 'user-card--first': isFirst }">{{ props.user.name }}</article>
</template>

<style lang="scss" scoped>
.user-card--first {
	font-weight: bold;
}
</style>
