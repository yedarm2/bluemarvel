<template>
	<div class="blue-marble-board">
		<board-line
			v-for="(tileList, lineIndex) in tileMatrix"
			:key="lineIndex"
			:line-number="lineIndex"
		>
			<template v-for="(tile, tileIndex) in tileList" :key="tileIndex">
				<board-corner-tile v-if="tile.isCornerTile()" />
				<board-tile v-else />
			</template>
		</board-line>
	</div>
</template>

<script>
import { defineComponent } from 'vue';

import { tileMatrix } from '@/shared/boardData';
import BoardLine from '../components/board/board-line.vue';
import BoardTile from '../components/board/board-tile.vue';
import BoardCornerTile from '../components/board/board-corner-tile.vue';

export default defineComponent({
	name: 'blue-marble-board',

	components: {
		BoardLine,
		BoardTile,
		BoardCornerTile,
	},

	setup() {
		return {
			tileMatrix,
		};
	},
});
</script>

<style lang="scss" scoped>
@import '../components/board/variables.scss';

.blue-marble-board {
	width: $board-size;
	height: $board-size;

	position: relative;
}
</style>
