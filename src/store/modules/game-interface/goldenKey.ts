import { Module } from 'vuex';
import { drawGoldenKey, GoldenKey } from '@/shared/goldenKey';
import { GoldenKeyState } from '@/store/states';
import { Bank } from '@/shared/Bank';
import { User } from '@/shared/User';
import { sleep } from '@/shared';
import { BaseTile } from '@/shared/boardData';

const store: Module<GoldenKeyState, any> = {
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

		async moveUserByDistance({ commit, dispatch }, distanceToMove: number) {
			await dispatch('gameInterface/moveUserByDistance', distanceToMove, {
				root: true,
			});

			commit('removeGoldenKey');
		},

		async moveUserByTile({ commit, dispatch }, destinationTile: BaseTile) {
			await dispatch('gameInterface/moveUserByTile', {
				destinationTile,
			}, {
				root: true,
			});

			commit('removeGoldenKey');
		},

		async warpUserByTile({ commit, dispatch }, destinationTile: BaseTile) {
			await dispatch('gameInterface/moveUserByTile', {
				isDirect: true,
				destinationTile,
			}, {
				root: true,
			});

			commit('removeGoldenKey');
		},

		// TODO: 다시 돌아온 뒤에 어떻게 해야되지??? 스킵시키는 게 맞을 텐데 어떻게 해야할까...
		async circumnavigation({ rootState, dispatch }) {
			const currentTurnUser = rootState.gameInterface.currentTurnUser as User;
			currentTurnUser.setTurnState('enableToDrawGoldenCard', false);

			const bank = rootState.gameInterface.bank as Bank;
			currentTurnUser.setMoney(bank.giveWelfareMoney());

			await dispatch('moveUserByTile', currentTurnUser.currentPositionTile);
			await dispatch('gameInterface/nextTurn', {}, {
				root: true,
			});
		},

		async tradeWithBank({ rootState }, tradingPrice: number) {
			const bank = rootState.gameInterface.bank as Bank;
			const currentTurnUser = rootState.gameInterface.currentTurnUser as User;

			// ?: 추후에 변경될 가능성이 클 것 같다.
			if (tradingPrice > 0) {
				bank.toGiveALoan(tradingPrice);
			} else if (tradingPrice < 0) {
				bank.setMoney(tradingPrice);
			}
			currentTurnUser.setMoney(tradingPrice);

			await sleep(2000);
		},
	},
};

export default store;
