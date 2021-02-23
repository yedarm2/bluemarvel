<template>
	<div class="player-pin-displayer">
		<div v-for="user in users" :key="user.id" class="player-pin-displayer__pin">
			<div class="player-pin-displayer__pin-body" />
			<div class="player-pin-displayer__pin-head" />
			<div class="player-pin-displayer__pin-id-text">
				{{ user.id }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'player-pin-displayer',

	props: {
		users: {
			type: Array,
			default: () => [],
		},
	},
});
</script>

<style lang="scss" scoped>
$pin-side-border-value: 5px solid transparent;

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

	&__pin-head {
		width: 15px;
		height: 15px;

		border-radius: 100px;

		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%);

		background-color: gold;
	}

	&__pin-body {
		width: 7px;
		border-bottom: 30px solid gold;
		border-left: $pin-side-border-value;
		border-right: $pin-side-border-value;

		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
	}

	&__pin-id-text {
		position: absolute;
		left: 50%;
		bottom: 2px;
		transform: translate(-50%);
	}
}
</style>
