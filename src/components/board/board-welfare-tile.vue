<template>
	<board-tile-template :users="users" class="board-welfare-tile">
		<div class="board-welfare-tile__name">사회복지기금</div>
		<div class="board-welfare-tile__english-name">WELFARE FUND</div>
		<div class="board-welfare-tile__price">15만원</div>
		<div class="board-welfare-tile__description">접수처에 지불하세요.</div>
	</board-tile-template>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';

import { BaseTile } from '@/shared/boardData';
import useUsersOnTile from '@/shared/useUsersOnTile';

import BoardTileTemplate from './board-tile-template.vue';

export default defineComponent({
	name: 'board-welfare-tile',

	components: {
		BoardTileTemplate,
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
			users: useUsersOnTile(tile),
		};
	},
});
</script>

<style scoped>
.board-welfare-tile {
	overflow: hidden;
}
</style>
