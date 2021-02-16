<template>
	<div class="board-tile">board-tile</div>
</template>

<script>
export default {
	name: 'board-tile',
};
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-tile {
	@include tile-style(false);
}
</style>
