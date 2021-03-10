<template>
	<div class="golden-key-processor">
		<tempalte v-if="drawedGoldenKey === null">
			황금열쇠를 뽑고 있습니다.
		</tempalte>
		<template v-else>
			<div class="golden-key-processor__golden-key-title">
				{{ drawedGoldenKey.title }}
			</div>
			<div class="golden-key-processor__golden-key-description">
				{{ drawedGoldenKey.description }}
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: 'GoldenKeyProcessor',

	setup() {
		const {
			state,
			commit,
			dispatch,
		} = useStore();

		const drawedGoldenKey = computed(() => state.gameInterface.goldenKey.drawedGoldenKey);

		dispatch('gameInterface/goldenKey/drawGoldenKey');

		onUnmounted(() => {
			commit('gameInterface/goldenKey/removeGoldenKey');
		});

		return {
			drawedGoldenKey,
		};
	},
})
</script>

<style lang="scss" scoped>
.golden-key-processor {
	text-align: center;

	&__golden-key-title {
		font-size: 1.2em;
		font-weight: bold;
	}
}
</style>
