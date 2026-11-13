<script setup lang="ts">
const { count, increment } = useCounter();
</script>

<template>
	<HelloMessage :name="String(count)" @click="increment" />
</template>
