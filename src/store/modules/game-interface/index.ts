import { Module } from 'vuex';
import { GameState } from '@/shared/policy';
import { GameInterfaceState } from "@/store/states";

const store: Module<GameInterfaceState, object> = {
	namespaced: true,

	state: {
		currentState: GameState.BEFORE_USER_CREATE,
		users: [],
	},

	mutations: {
		change(state, value) {
			state.currentState = value;
		},
		setUser(state, value) {
			state.users = value;
		}
	}
};

export default store;
