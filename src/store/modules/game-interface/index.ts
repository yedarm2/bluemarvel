import { Module } from 'vuex';
import { GameState, SALARY_MONEY } from '@/shared/policy';
import { GameInterfaceState } from "@/store/states";
import { getTileForDistance, getTileListBetweenFromtAndTo } from '@/shared/boardUtils';
import { User } from '@/shared/User';
import { Bank } from '@/shared/Bank';
import { sleep } from '@/shared/index';
import { BaseTile, TileType } from '@/shared/boardData';

import goldenKeyModule from './goldenKey';

const getDiceNumber = (): number => Math.ceil(Math.random() * 6);

const getDiceResult = () => {
	if (window.injectedDice && window.injectedDice.length > 1) {
		const result = window.injectedDice;
		window.injectedDice = [];

		return result;
	}

	return [getDiceNumber(), getDiceNumber()];
};

const store: Module<GameInterfaceState, object> = {
	namespaced: true,

	state: {
		prevState: GameState.BEFORE_USER_CREATE,
		currentState: GameState.BEFORE_USER_CREATE,
		users: [],
		bank: new Bank(),
		currentTurnUser: null,
		currentTurnDiceResult: [],
		selectedTile: null,
	},

	getters: {
		nextTurnUser(state) {
			const currentTurnUserIndex = state.users.findIndex((user) => user.id === state.currentTurnUser?.id);
			if (currentTurnUserIndex !== -1) {
				return state.users[currentTurnUserIndex + 1] ? state.users[currentTurnUserIndex + 1] : state.users[0];
			}
			throw new Error('유저가 없는 상태에서 호출 되었습니다.')
		},
		isDouble(state) {
			const set = new Set(state.currentTurnDiceResult);
			return !set.has(0) && set.size === 1;
		},
		diceSum({ currentTurnDiceResult }) {
			return currentTurnDiceResult[0] + currentTurnDiceResult[1];
		},
	},

	mutations: {
		setPrevState(state, value) {
			state.prevState = value;
		},
		setCurrentState(state, value) {
			state.currentState = value;
		},
		setUser(state, value) {
			state.users = value;
		},
		setCurrentTurnUser(state, value) {
			state.currentTurnUser = value;
		},
		setCurrentTurnDiceResult(state, value) {
			state.currentTurnDiceResult = value;
		},
		setSelectedTile(state, value) {
			state.selectedTile = value;
		}
	},

	actions: {
		async rollDice({ getters, commit, dispatch }, diceResult = getDiceResult()) {
			commit('setCurrentTurnDiceResult', diceResult);

			await dispatch('moveUserByDistance', getters.diceSum);
		},

		async moveUserByDistance({ state, dispatch }, distanceValue: number) {
			const currentTurnUser = state.currentTurnUser as User;
			const { currentPositionTile } = currentTurnUser;
			const destinationTile = getTileForDistance(currentPositionTile, distanceValue);
			const isReverse = distanceValue < 0;

			await dispatch('moveUserByTile', { destinationTile, isReverse });
		},

		async moveUserByTile({ state, getters, commit }, { destinationTile, isReverse = false }: {destinationTile: BaseTile; isReverse: boolean}) {
			const bank = state.bank as Bank;
			const currentTurnUser = state.currentTurnUser as User;
			const { currentPositionTile } = currentTurnUser;

			const routeTiles = [
				...getTileListBetweenFromtAndTo(currentPositionTile, destinationTile, isReverse),
				destinationTile,
			];

			let nextRouteTile = routeTiles.shift();
			while (nextRouteTile) {
				await sleep(100);
				currentTurnUser.setPositionTile(nextRouteTile);

				if (nextRouteTile.type === TileType.STARTING_POINT) {
					bank.setMoney(-SALARY_MONEY);
					currentTurnUser.setMoney(SALARY_MONEY);
				}

				nextRouteTile = routeTiles.shift();
			}

			if (currentTurnUser.currentPositionTile.type === TileType.DESERT_ISLAND) {
				commit('setCurrentTurnUser', getters.nextTurnUser);
				commit('setCurrentState', GameState.BEFORE_USER_COMMAND);
				return;
			}

			commit('setCurrentState', GameState.USER_MOVED);
			commit('setSelectedTile', destinationTile);
		},

		async rollDiceOnDesertIsland({ state, getters, commit, dispatch }) {
			const diceResult = getDiceResult();
			commit('setCurrentTurnDiceResult', diceResult);

			if (getters.isDouble) {
				await dispatch('rollDice', diceResult);
			} else {
				const currentTurnUser = state.currentTurnUser as User;
				currentTurnUser.decreaseBindingTurnCountOnDesert();

				await sleep(1000);
				commit('setCurrentTurnUser', getters.nextTurnUser);
				commit('setCurrentState', GameState.BEFORE_USER_COMMAND);
			}
		},

		nextTurn({ state, getters, commit }, {
			stateToChange = GameState.BEFORE_USER_COMMAND,
			forceSkip = false,
		} = {}) {
			const currentTurnUser = state.currentTurnUser as User;
			currentTurnUser.resetTurnState();

			if (!getters.isDouble && !forceSkip) {
				commit('setCurrentTurnUser', getters.nextTurnUser);
			}

			commit('setCurrentState', stateToChange);
		},
	},

	modules: {
		goldenKey: goldenKeyModule,
	},
};

declare global  {
	interface Window {
		injectedDice: number[];
	}
}

window.injectedDice = [4, 3];

export default store;
