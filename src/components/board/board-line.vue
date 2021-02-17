<template>
	<div :class="lineClass" class="board-line">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

import { getStringByNumber, LineNumber } from '@/shared/boardUtils';

export default defineComponent({
	name: 'board-line',

	props: {
		lineNumber: {
			type: Number as PropType<LineNumber>,
			required: true,
		},
	},

	setup(props) {
		const { lineNumber } = toRefs(props);

		const lineClass = computed(
			() => `board-line__${getStringByNumber(lineNumber.value)}`,
		);

		return {
			lineClass,
		};
	},
});
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-line {
	display: flex;
	flex-direction: row-reverse;

	width: $board-line-width;
	height: $tile-height;

	position: absolute;

	&__first {
		right: 0;
		bottom: 0;
	}

	&__second {
		top: $tile-height;
		left: $tile-height;

		transform: rotate(90deg);
		transform-origin: left top;
	}

	&__third {
		top: 0;
		left: 0;

		transform: rotate(180deg);
	}

	&__fourth {
		top: 0;
		right: tile-height;

		transform: rotate(-90deg);
		transform-origin: right top;
	}
}
</style>
