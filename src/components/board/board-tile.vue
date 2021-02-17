<template>
	<div class="board-tile">board-tile</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'board-tile',
});
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-tile {
	@include tile-style(false);
}
</style>
