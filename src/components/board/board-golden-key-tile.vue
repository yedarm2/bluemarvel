<template>
	<board-tile-template :users="users" class="board-golden-key-tile">
		황금열쇠
	</board-tile-template>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';

import { GoldenKeyTile } from '@/shared/boardData';
import useUsersOnTile from '@/shared/useUsersOnTile';

import BoardTileTemplate from './board-tile-template.vue';

export default defineComponent({
	name: 'board-golden-key-tile',

	components: {
		BoardTileTemplate,
	},

	props: {
		tile: {
			type: Object as PropType<GoldenKeyTile>,
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
.board-golden-key-tile {
	display: block;
}
</style>
