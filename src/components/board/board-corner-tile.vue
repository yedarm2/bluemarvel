<template>
	<div class="board-corner-tile">
		<div class="board-corner-tile__pin-wrapper">
			<player-pin v-for="user in users" :key="user.id" :id="user.id" />
		</div>
		<div class="board-corner-tile__tile-name">
			{{ tileName }}
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, toRefs } from 'vue';

import { BaseTile, TileType } from '@/shared/boardData';
import useUsersOnTile from '@/shared/useUsersOnTile';

import PlayerPin from './player-pin.vue';

const getTileContext = (tile: Ref<BaseTile>) => {
	const isStartingPoint = computed(
		() => tile.value.type === TileType.STARTING_POINT,
	);
	const isDesertIsland = computed(
		() => tile.value.type === TileType.DESERT_ISLAND,
	);
	const isGetWelfare = computed(() => tile.value.type === TileType.GET_WELFARE);
	const isSpaceTravel = computed(
		() => tile.value.type === TileType.SPACE_TRAVEL,
	);

	const tileName = computed(() => {
		if (isStartingPoint.value) return '출발';
		if (isDesertIsland.value) return '무인도';
		if (isGetWelfare.value) return '사회복지기금 접수처';
		if (isSpaceTravel.value) return '우주여행';

		return '';
	});

	return {
		tileName,
	};
};

export default defineComponent({
	name: 'board-corner-tile',

	components: {
		PlayerPin,
	},

	props: {
		tile: {
			type: Object as PropType<BaseTile>,
			required: true,
		},
	},

	setup(props) {
		const { tile } = toRefs(props);

		return {
			...getTileContext(tile),
			users: useUsersOnTile(tile),
		};
	},
});
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-corner-tile {
	@include tile-style(true);

	&__pin-wrapper {
		display: flex;
		justify-content: center;

		position: absolute;
		left: 50%;
		top: calc(50%);
		transform: translate(calc(-50% - 25px), calc(-50% - 25px)) rotate(-45deg);
	}

	&__tile-name {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) rotate(-45deg);

		width: max-content;
	}
}
</style>
