<template>
	<div class="board-welfare-tile">
		<div class="board-welfare-tile--name">사회복지기금</div>
		<div class="board-welfare-tile--english-name">WELFARE FUND</div>
		<div class="board-welfare-tile--price">15만원</div>
		<div class="board-welfare-tile--description">접수처에 지불하세요.</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { BaseTile } from '@/shared/boardData';

export default defineComponent({
	name: 'board-welfare-tile',

	props: {
		tile: {
			type: Object as PropType<BaseTile>,
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
.board-welfare-tile {
	overflow: hidden;
}
</style>
