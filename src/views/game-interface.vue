<template>
	<div v-if="show" class="game-interface">
		<template v-if="currentState === GameState.BEFORE_USER_CREATE">
			<before-user-create @start-game="init" />
		</template>
		<template v-else-if="currentState === GameState.BEFORE_USER_COMMAND">
			<before-user-command @hide-game-interface="hideGameInterface" @trade-with-bank="changeState(GameState.TRADE_WITH_BANK)" />
		</template>
		<template v-else-if="currentState === GameState.TRADE_WITH_BANK">
			<trade-with-bank :bank-instance="bank" @end-trade="changeState(prevState)"/>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, reactive } from 'vue';
import { useStore } from "vuex";
import { GameState } from "@/shared/policy";
import { User } from "@/shared/User";
import { Bank } from "@/shared/Bank";
import BeforeUserCreate from '@/components/game-interface/before-user-create.vue';
import BeforeUserCommand from '@/components/game-interface/before-user-command.vue';
import TradeWithBank from '@/components/game-interface/trade-with-bank.vue';

export default defineComponent({
	name: 'GameInterface',
	components: { BeforeUserCreate, BeforeUserCommand, TradeWithBank },
	props: {
		users: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	setup() {
		const bank = reactive(new Bank());
		const show = ref(true);
		const {
			state: { gameInterface },
			getters,
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
			commit('gameInterface/setCurrentState', GameState.USER_CREATED);
		}

		function changeState(state: GameState) {
			commit('gameInterface/setCurrentState', state);
		}

		watch(
			() => JSON.parse(JSON.stringify(gameInterface)),
			(curr, prev) => {
				// console.info(prev, curr);
				commit('gameInterface/setPrevState', prev.currentState as GameState);
				switch (curr.currentState) {
					case GameState.USER_CREATED:
						commit('gameInterface/setCurrentState', GameState.BEFORE_USER_COMMAND);
						break;
					case GameState.TRADE_WITH_BANK:
						break;
					case GameState.USER_MOVED:
						if (!getters['gameInterface/isDouble']) {
							commit('gameInterface/setCurrentTurnUser', getters['gameInterface/nextTurnUser']);
						}

						commit('gameInterface/setCurrentState', GameState.BEFORE_USER_COMMAND);
						break;
					default:
						break;
				}
			},
			// { deep: true }
		);

		return {
			GameState,
			prevState: computed(() => gameInterface.prevState),
			currentState: computed(() => gameInterface.currentState),
			show,
			bank,
			init,
			hideGameInterface,
			changeState
		};
	},
});
</script>

<style lang="scss">
	.game-interface {
		position: fixed;
		top: 0;
		left: 1040px;
		right: 0;
		// width: 100vw;
		height: 100vh;
		background-color: pink;

		z-index: 10;
	}
</style>
