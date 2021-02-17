<template>
	<div class="board-corner-tile">board-corner-tile</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'board-corner-tile',
});
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-corner-tile {
	@include tile-style(true);
}
</style>
