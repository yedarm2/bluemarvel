import { Module } from 'vuex';
import { GameState } from '@/shared/policy';
import { GameInterfaceState } from "@/store/states";
import { getTileForDistance, getTileListBetweenFromtAndTo } from '@/shared/boardUtils';
import { User } from '@/shared/User';
import { sleep } from '@/shared/sleep';

const store: Module<GameInterfaceState, object> = {
	namespaced: true,

	state: {
		prevState: GameState.BEFORE_USER_CREATE,
		currentState: GameState.BEFORE_USER_CREATE,
		users: [],
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
		}
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
		async rolledDice({ state, getters, commit }, diceResult: number[]) {
			commit('setCurrentTurnDiceResult', diceResult);

			const currentTurnUser = state.currentTurnUser as User;
			const { currentPositionTile } = currentTurnUser;
			const distance = diceResult[0] + diceResult[1];
			const destinationTile = getTileForDistance(currentPositionTile, distance);

			const routeTiles = [
				...getTileListBetweenFromtAndTo(currentPositionTile, destinationTile),
				destinationTile,
			];

			let nextRouteTile = routeTiles.shift();
			while (nextRouteTile) {
				await sleep(100);
				console.info({...nextRouteTile});
				currentTurnUser.setPositionTile(nextRouteTile);
				nextRouteTile = routeTiles.shift();
			}

			if (!getters.isDouble) {
				commit('setCurrentTurnUser', getters.nextTurnUser);
			}
		},
	},
};

export default store;
