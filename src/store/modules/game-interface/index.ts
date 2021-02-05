import { Module } from 'vuex';
import { GameState } from '@/shared/policy';
import { GameInterfaceState } from "@/store/states";

const store: Module<GameInterfaceState, object> = {
	namespaced: true,

	state: {
		currentState: GameState.BEFORE_USER_CREATE
	},

	mutations: {
		change(state, value) {
			state.currentState = value;
		}
	}
};

export default store;
