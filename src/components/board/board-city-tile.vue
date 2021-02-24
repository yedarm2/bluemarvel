<template>
	<board-tile-template :users="users" class="board-city-tile">
		<div :class="headerClass" class="board-city-tile__header" />
		<div class="board-city-tile__name">
			{{ name }}
		</div>
		<div class="board-city-tile__english-name">
			{{ englishName }}
		</div>
		<div class="board-city-tile__price">
			{{ price }}
		</div>
		<div class="board-city-tile__description">
			{{ description }}
		</div>
	</board-tile-template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, toRefs } from 'vue';

import { CityTile } from '@/shared/boardData';
import {
	getBoardLineNumberByTile,
	getStringByNumber,
} from '@/shared/boardUtils';
import useUsersOnTile from '@/shared/useUsersOnTile';

import BoardTileTemplate from './board-tile-template.vue';

const getCityContext = (tile: Ref<CityTile>) => ({
	name: computed(() => tile.value.name),
	englishName: computed(() => tile.value.englishName),
	price: computed(
		() => `${tile.value.buildingPriceInfo.areaPrice / 10000}만원`,
	),
	description: computed(() => tile.value.description),
});

export default defineComponent({
	name: 'board-city-tile',

	components: {
		BoardTileTemplate,
	},

	props: {
		tile: {
			type: Object as PropType<CityTile>,
			required: true,
		},
	},

	setup(props) {
		const { tile } = toRefs(props);

		const headerClass = computed(() => {
			const cityLineNumber = getBoardLineNumberByTile(tile.value);

			return `board-city-tile__header--${getStringByNumber(
				cityLineNumber,
			)}-line`;
		});

		return {
			headerClass,
			...getCityContext(tile),
			users: useUsersOnTile(tile),
		};
	},
});
</script>

<style lang="scss" scoped>
.board-city-tile {
	&__header {
		box-sizing: border-box;
		height: 40px;
		border-bottom: 1px solid #000;
		border-radius: 2px 2px 0 0;

		// TODO: 임시 색상
		&--first-line {
			background-color: #ff2b2b;
		}

		&--second-line {
			background-color: #ff892b;
		}

		&--third-line {
			background-color: #2c7900;
		}

		&--fourth-line {
			background-color: #147dc1;
		}
	}
}
</style>
