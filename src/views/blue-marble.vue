<template>
	<div class="blue-marble">
		{{ helloWorld }}
		<blue-marble-board />
		<game-interface />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GameInterface from './game-interface.vue';
import BlueMarbleBoard from './blue-marble-board.vue';

export default defineComponent({
	name: 'BlueMarble',

	components: {
		GameInterface,
		BlueMarbleBoard,
	},

	setup() {
		const helloWorld = ref('Hello, world!');

		return {
			helloWorld,
		};
	},
});
</script>

<style lang="scss">
.blue-marble {
	position: relative;
	z-index: 1;
	background-color: white;
}
</style>
