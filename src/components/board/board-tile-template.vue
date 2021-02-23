<template>
	<div class="board-tile-template">
		<slot />
		<player-pin-displayer :users="users" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PlayerPinDisplayer from './player-pin-displayer.vue';

export default defineComponent({
	name: 'board-tile-template',

	components: {
		PlayerPinDisplayer,
	},

	props: {
		users: {
			type: Array,
			default: () => [],
		},
	},
});
</script>

<style lang="scss" scoped>
@import './variables.scss';

.board-tile-template {
	@include tile-style(false);
}
</style>
