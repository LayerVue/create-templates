<template>
  <div>{{ (x, y) }}</div>
</template>

<script setup lang="ts">
import { useMouse } from '../packages/main';
const { x, y } = useMouse();
</script>

<style scoped></style>
