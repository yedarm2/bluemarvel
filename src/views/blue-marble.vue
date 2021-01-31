<template>
	<div class="blue-marble">
		{{ helloWorld }}
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'BlueMarble',

	setup() {
		const helloWorld = ref('Hello, world!');

		return {
			helloWorld,
		};
	},
});
</script>
