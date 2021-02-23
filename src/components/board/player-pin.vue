<template>
	<div class="player-pin">
		<div class="player-pin__body" />
		<div class="player-pin__head" />
		<div class="player-pin__id-text">
			{{ id }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'player-pin',

	props: {
		id: {
			type: Number,
			required: true,
		},
	},
});
</script>

<style lang="scss" scoped>
$pin-side-border-value: 5px solid transparent;

.player-pin {
	position: relative;
	width: 20px;
	height: 40px;

	&__head {
		width: 15px;
		height: 15px;

		border-radius: 100px;

		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%);

		background-color: gold;
	}

	&__body {
		width: 7px;
		border-bottom: 30px solid gold;
		border-left: $pin-side-border-value;
		border-right: $pin-side-border-value;

		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
	}

	&__id-text {
		position: absolute;
		left: 50%;
		bottom: 2px;
		transform: translate(-50%);
	}
}
</style>
