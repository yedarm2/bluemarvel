<template>
	<div class="player-pin-displayer">
		<player-pin v-for="user in users" :key="user.id" :id="user.id" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PlayerPin from './player-pin.vue';

export default defineComponent({
	name: 'player-pin-displayer',

	components: {
		PlayerPin,
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
.player-pin-displayer {
	display: flex;
	justify-content: center;

	width: 100%;

	position: absolute;
	bottom: calc(100% + 10px);

	&__pin {
		position: relative;
		width: 20px;
		height: 40px;
	}
}
</style>
