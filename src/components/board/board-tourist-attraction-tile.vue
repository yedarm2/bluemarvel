<template>
	<div class="board-tourist-attraction-tile">
		<div class="board-tourist-attraction-tile__name">
			{{ name }}
		</div>
		<div class="board-tourist-attraction-tile__english-name">
			{{ englishName }}
		</div>
		<div class="board-tourist-attraction-tile__price">
			{{ price }}
		</div>
		<div class="board-tourist-attraction-tile__description">
			{{ description }}
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, toRefs } from 'vue';
import { TouristAttractionTile } from '@/shared/boardData';

const getTouristAttractionContext = (tile: Ref<TouristAttractionTile>) => ({
	name: computed(() => tile.value.name),
	englishName: computed(() => tile.value.englishName),
	price: computed(() => `${tile.value.price / 10000}만원`),
	description: computed(() => tile.value.description),
});

export default defineComponent({
	name: 'board-tourist-attraction-tile',

	props: {
		tile: {
			type: Object as PropType<TouristAttractionTile>,
			required: true,
		},
	},

	setup(props) {
		const { tile } = toRefs(props);

		return {
			...getTouristAttractionContext(tile),
		};
	},
});
</script>

<style scoped>
.board-tourist-attraction-tile {
	display: block;
}
</style>
