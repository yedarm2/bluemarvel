<template>
	<div class="board-golden-key-tile">황금열쇠</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { GoldenKeyTile } from '@/shared/boardData';

export default defineComponent({
	name: 'board-golden-key-tile',

	props: {
		tile: {
			type: Object as PropType<GoldenKeyTile>,
			required: true,
		},
	},

	setup(props) {
		const { tile } = toRefs(props);

		return {};
	},
});
</script>

<style scoped>
.board-golden-key-tile {
	display: block;
}
</style>
