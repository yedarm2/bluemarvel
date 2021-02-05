import { Module } from 'vuex';
import { GameState } from "@/shared/policy";

const store: Module<BlueMarbleState, RootState> = {
	namespaced: true,

	state: {},
};

export default store;
