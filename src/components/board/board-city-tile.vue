<template>
	<div class="board-city-tile">
		<div :class="headerClass" class="board-city-tile--header" />
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
import {
	getBoardLineNumberByTile,
	getStringByNumber,
} from '@/shared/boardUtils';

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

		const headerClass = computed(() => {
			const cityLineNumber = getBoardLineNumberByTile(tile.value);

			return `board-city-tile--header__${getStringByNumber(
				cityLineNumber,
			)}-line`;
		});

		return {
			...getCityContext(tile),
			headerClass,
		};
	},
});
</script>

<style lang="scss" scoped>
.board-city-tile {
	overflow: hidden;

	&--header {
		box-sizing: border-box;
		height: 40px;
		border-bottom: 1px solid #000;

		// TODO: 임시 색상
		&__first-line {
			background-color: #ff2b2b;
		}

		&__second-line {
			background-color: #ff892b;
		}

		&__third-line {
			background-color: #2c7900;
		}

		&__fourth-line {
			background-color: #147dc1;
		}
	}
}
</style>
