<template>
	<div v-if="show" class="game-interface">
		<template v-if="currentState === GameState.BEFORE_USER_CREATE">
			<before-user-create @start-game="init" />
		</template>
		<template v-if="currentState === GameState.BEFORE_USER_COMMAND">
			<before-user-command @hide-game-interface="hideGameInterface" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';
import { useStore } from "vuex";
import { GameState } from "@/shared/policy";
import { User } from "@/shared/User";
import { Bank } from "@/shared/Bank";
import BeforeUserCreate from '@/components/game-interface/before-user-create.vue';
import BeforeUserCommand from '@/components/game-interface/before-user-command.vue';

export default defineComponent({
	name: 'GameInterface',
	components: { BeforeUserCreate, BeforeUserCommand },
	props: {
		users: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	setup() {
		const bank = new Bank();
		const show = ref(true);
		const {
			state: { gameInterface },
			commit
		} = useStore();

		function hideGameInterface() {
			show.value = false;
		}

		function allocationMoney() {
			gameInterface.users.forEach((user: User) => {
				user.setMoney(bank.toGiveALoan(5000000));
			});
		}

		function init() {
			allocationMoney();
			commit('gameInterface/changeCurrentState', GameState.USER_CREATED);
		}

		watch(
			() => JSON.parse(JSON.stringify(gameInterface)),
			(curr, prev) => {
				console.info(curr, prev);
				switch (curr.currentState) {
					case GameState.USER_CREATED:
						commit('gameInterface/changeCurrentState', GameState.BEFORE_USER_COMMAND);
						break;
					default:
						break;
				}
			},
			// { deep: true }
		);

		return {
			GameState,
			currentState: computed(() => gameInterface.currentState),
			show,
			init,
			hideGameInterface
		};
	},
});
</script>

<style lang="scss">
	.game-interface {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: pink;

		z-index: 10;
	}
</style>
