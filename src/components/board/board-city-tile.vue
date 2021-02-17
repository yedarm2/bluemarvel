<template>
	<div class="board-city-tile">
		<div class="board-city-tile--name">
			{{ name }}
		</div>
		<div class="board-city-tile--english-name">
			{{ englishName }}
		</div>
		<div class="board-city-tile--price">
			{{ price }}
		</div>
		<div class="board-city-tile--description">
			{{ description }}
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, toRefs } from 'vue';
import { CityArea } from '@/shared/boardData';

const getCityContext = (tile: Ref<CityArea>) => ({
	name: computed(() => tile.value.name),
	englishName: computed(() => tile.value.englishName),
	price: computed(
		() => `${tile.value.buildingPriceInfo.areaPrice / 10000}만원`,
	),
	description: computed(() => tile.value.description),
});

export default defineComponent({
	name: 'board-city-tile',

	props: {
		tile: {
			type: Object as PropType<CityArea>,
			required: true,
		},
	},

	setup(props) {
		const { tile } = toRefs(props);

		return {
			...getCityContext(tile),
		};
	},
});
</script>

<style scoped>
.board-city-tile {
	overflow: hidden;
}
</style>
