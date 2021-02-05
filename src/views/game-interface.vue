<template>
	<div class="game-interface">
		{{ helloWorld }}
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'GameInterface',

	setup() {
		const helloWorld = ref('test!');

		return {
			helloWorld,
		};
	},
});
</script>
