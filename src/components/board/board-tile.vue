<template>
	<board-city-tile v-if="isCity" :tile="tile" class="board-tile" />
	<board-tourist-attraction-tile
		v-else-if="isTouristAttraction"
		:tile="tile"
		class="board-tile"
	/>
	<board-golden-key-tile
		v-else-if="isGoldenKey"
		:tile="tile"
		class="board-tile"
	/>
	<board-welfare-tile v-else :tile="tile" class="board-tile" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

import { BaseTile, TileType } from '@/shared/boardData';

import BoardCityTile from './board-city-tile.vue';
import BoardTouristAttractionTile from './board-tourist-attraction-tile.vue';
import BoardGoldenKeyTile from './board-golden-key-tile.vue';
import BoardWelfareTile from './board-welfare-tile.vue';

export default defineComponent({
	name: 'board-tile',

	components: {
		BoardCityTile,
		BoardTouristAttractionTile,
		BoardGoldenKeyTile,
		BoardWelfareTile,
	},

	props: {
		tile: {
			type: Object as PropType<BaseTile>,
			required: true,
		},
	},

	setup(props) {
		const { tile } = toRefs(props);

		const isCity = computed(() => tile.value.type === TileType.CITY);
		const isTouristAttraction = computed(
			() => tile.value.type === TileType.TOURIST_ATTRACTION,
		);
		const isGoldenKey = computed(() => tile.value.type === TileType.GOLDEN_KEY);

		return {
			isCity,
			isTouristAttraction,
			isGoldenKey,
		};
	},
});
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-tile {
	@include tile-style(false);
}
</style>
