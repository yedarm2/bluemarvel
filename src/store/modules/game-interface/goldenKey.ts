import { Module } from 'vuex';
import { drawGoldenKey, GoldenKey } from '@/shared/goldenKey';
import { GoldenKeyState } from '@/store/states';

const store: Module<GoldenKeyState, object> = {
	namespaced: true,

	state: {
		drawedGoldenKey: null,
	},

	mutations: {
		setGoldenKey(state, goldenKey: GoldenKey) {
			console.info(goldenKey);
			state.drawedGoldenKey = goldenKey;
		},

		removeGoldenKey(state) {
			state.drawedGoldenKey = null;
		},
	},

	actions: {
		async drawGoldenKey({ commit }) {
			const goldenKey = drawGoldenKey;
			commit('setGoldenKey', goldenKey);
		},
	},
};

export default store;
