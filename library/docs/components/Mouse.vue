<template>
  <div>{{ `mouse:${x},${y}` }}</div>
</template>

<script setup lang="ts">
import { useMouse } from 'layer-library-template';
const { x, y } = useMouse();
</script>

<style scoped></style>
