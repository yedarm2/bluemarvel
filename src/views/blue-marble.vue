<template>
	<div class="blue-marble">
		{{ helloWorld }}
		<game-interface />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GameInterface from './game-interface.vue';

export default defineComponent({
	name: 'BlueMarble',
	components: {
		GameInterface
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
