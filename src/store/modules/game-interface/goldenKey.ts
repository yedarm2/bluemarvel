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
			state.drawedGoldenKey = goldenKey;
		},

		removeGoldenKey(state) {
			state.drawedGoldenKey = null;
		},
	},

	actions: {
		async drawGoldenKey({ commit, dispatch }) {
			const goldenKey = drawGoldenKey();
			commit('setGoldenKey', goldenKey);

			await dispatch(goldenKey.actionToTrigger, goldenKey.actionPayload);
		},

		async moveToUser({ commit, dispatch }, distanceToMove: number) {
			await dispatch('gameInterface/moveUser', distanceToMove, {
				root: true,
			});

			commit('removeGoldenKey');
		},
	},
};

export default store;
