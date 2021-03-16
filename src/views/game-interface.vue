<template>
	<div class="game-interface">
		<template v-if="currentState === GameState.BEFORE_USER_CREATE">
			<before-user-create @start-game="init" />
		</template>
		<template v-else-if="currentState === GameState.BEFORE_USER_COMMAND">
			<before-user-command @trade-with-bank="changeState(GameState.TRADE_WITH_BANK)" />
		</template>
		<template v-else-if="currentState === GameState.TRADE_WITH_BANK">
			<trade-with-bank @end-trade="nextTurn(GameState.BEFORE_USER_COMMAND)"/>
		</template>
		<template v-else-if="currentState === GameState.USER_MOVED">
			<trade-with-bank @end-trade="nextTurn(GameState.BEFORE_USER_COMMAND)"/>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';

import { GameState } from "@/shared/policy";
import { User } from "@/shared/User";
import { BaseTile, TileType } from '@/shared/boardData';
import useGameInterfaceState from '@/shared/useGameInterfaceState';

import BeforeUserCreate from '@/components/game-interface/before-user-create.vue';
import BeforeUserCommand from '@/components/game-interface/before-user-command.vue';
import TradeWithBank from '@/components/game-interface/trade-with-bank.vue';

const useBoardController = () => {
	const {
		getters,
		commit,
	} = useStore();

	function changeState(state: GameState) {
		commit('gameInterface/setCurrentState', state);
	}

	function nextTurn(state: GameState) {
		if (!getters['gameInterface/isDouble']) {
			commit('gameInterface/setCurrentTurnUser', getters['gameInterface/nextTurnUser']);
		}
		changeState(state);
	}

	return {
		changeState,
		nextTurn,
	};
};

const useInstanceMethods = () => {
	const {
		state: { gameInterface },
		commit,
	} = useStore();

	function allocationMoney() {
		gameInterface.users.forEach((user: User) => {
			user.setMoney(gameInterface.bank.toGiveALoan(5000000));
		});
	}

	function init() {
		allocationMoney();
		commit('gameInterface/setCurrentState', GameState.USER_CREATED);
	}

	return {
		prevState: computed(() => gameInterface.prevState),
		currentState: computed(() => gameInterface.currentState),
		init,
	};
};

const useChangeStateAfterUserCommand = () => {
	const {
		currentTurnUser,
	} = useGameInterfaceState();

	const {
		changeState,
		nextTurn,
	} = useBoardController();

	return () => {
		const arrivedTile = currentTurnUser.value?.currentPositionTile as BaseTile;
		const arrivedTileType = arrivedTile.type;

		const tileTypesToTrade = [TileType.CITY, TileType.TOURIST_ATTRACTION];

		if (arrivedTileType === TileType.STARTING_POINT) {
			nextTurn(GameState.BEFORE_USER_COMMAND);
		} else if (arrivedTileType === TileType.DESERT_ISLAND) {
			// ? action으로 옮길까??
			(currentTurnUser.value as User).bindOnDesertIsland();
			nextTurn(GameState.BEFORE_USER_COMMAND);
		} else if (tileTypesToTrade.includes(arrivedTileType)) {
			changeState(GameState.TRADE_WITH_BANK);
		} else if (arrivedTileType === TileType.GOLDEN_KEY) {
			// TODO: 추후에 추가
		} else if (arrivedTileType === TileType.GET_WELFARE) {
			// TODO: 추후에 추가
		} else if (arrivedTileType === TileType.PAY_WELFARE) {
			// TODO: 추후에 추가
		} else if (arrivedTileType === TileType.SPACE_TRAVEL) {
			changeState(GameState.TRAVEL_IN_SPACE);
		}
	};
};

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
		const {
			state: { gameInterface },
			commit
		} = useStore();
		const changeStateAfterUserCommand = useChangeStateAfterUserCommand();

		watch(
			() => JSON.parse(JSON.stringify(gameInterface)),
			(curr, prev) => {
				commit('gameInterface/setPrevState', prev.currentState as GameState);
				switch (curr.currentState) {
					case GameState.USER_CREATED:
						commit('gameInterface/setCurrentState', GameState.BEFORE_USER_COMMAND);
						break;
					case GameState.USER_MOVED:
						changeStateAfterUserCommand();
						break;
					default:
						break;
				}
			},
			// { deep: true }
		);

		return {
			GameState,
			...useInstanceMethods(),
			...useBoardController(),
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
