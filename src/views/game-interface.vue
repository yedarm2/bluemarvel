<template>
	<div class="game-interface">
		{{ currentState }}
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from "vuex";
import { GameState } from "@/shared/policy";

export default defineComponent({
	name: 'GameInterface',

	setup() {
		const {
			state: { gameInterface },
			commit
		} = useStore();

		setTimeout(() => {
			commit('gameInterface/change', GameState.USER_CREATED);
		}, 1000);

		watch(
			() => JSON.parse(JSON.stringify(gameInterface)),
			(currentState, prevState) => {
				console.info(currentState, prevState);
			},
			// { deep: true }
		);

		return {
			currentState: computed(() => gameInterface.currentState),
		};
	},
});
</script>
