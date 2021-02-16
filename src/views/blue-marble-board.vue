<template>
	<div class="blue-marble-board">
		<template v-if="true">
			<board-tile />
			<board-corner-tile />
		</template>
	</div>
</template>

<script>
import BoardTile from '../components/board/board-tile.vue';
import BoardCornerTile from '../components/board/board-corner-tile.vue';

export default {
	name: 'blue-marble-board',

	components: {
		BoardTile,
		BoardCornerTile,
	},
};
</script>

<style lang="scss" scoped>
@import '../components/board/variables.scss';

.blue-marble-board {
	width: $board-size;
	height: $board-size;
}
</style>
