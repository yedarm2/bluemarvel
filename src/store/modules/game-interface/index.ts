import { Module } from 'vuex';
import {GameInterfaceState, RootState} from "../../@types";
import GameState from "../../../shared/policy";

const store: Module<GameInterfaceState, RootState> = {
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
