<template>
	<p v-if="hasDiceResult">
		주사위 결과: {{ currentTurnDiceResult[0] }} + {{ currentTurnDiceResult[1] }} = {{ diceSum }}
	</p>
	<p>
		<strong v-if="isDouble">더블이 나왔습니다.</strong>
		{{ currentTurnUserId }} 유저의 턴 입니다. 거래를 하거나 주사위를 굴려서 게임을 진행 해주세요.
		거래를 먼저 진행한 후 주사위를 굴려주세요.
	</p>
	<p v-if="currentTurnUserIsBindedDesertIsland">
		현재 무인도에 갇힌 상태입니다. 더블이 나오거나 {{ bindingTurnCountOnDesert }} 턴 뒤에 나올 수 있습니다.
	</p>
	<button v-if="isUserHasTile" @click="$emit('trade-with-bank')">내 토지 팔기</button>
	<button @click="rollDice">주사위 굴리기(즉시 실행됩니다.)</button>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs, watch} from 'vue';
import {useStore} from "vuex";

import useGameInterfaceState from '@/shared/useGameInterfaceState';
import { BaseTile, TileType } from '@/shared/boardData';

const useDiceData = () => {
	const {
		state: { gameInterface },
		getters,
	} = useStore();

	const {
		currentTurnDiceResult,
	} = toRefs(gameInterface);

	return {
		isUserHasTile: computed(() => gameInterface.bank.checkUserHasTile(gameInterface.currentTurnUser.id)),
		hasDiceResult: computed(() => currentTurnDiceResult.value.length > 0),
		currentTurnDiceResult: computed(() => currentTurnDiceResult.value),
		isDouble: computed(() => getters['gameInterface/isDouble']),
		diceSum: computed(() => getters['gameInterface/diceSum']),
	};
};

const useCurrentUserData = () => {
	const {
		dispatch,
	} = useStore();
	const {
		currentState,
		currentTurnUser,
	} = useGameInterfaceState();


	const resetDiceResult = () => {
		useStore().commit('gameInterface/setCurrentTurnDiceResult', []);
	};

	resetDiceResult();

	watch(() => currentState, () => {
		resetDiceResult()
	});

	watch(() => currentTurnUser, () => {
		resetDiceResult()
	});

	const currentTurnUserId = computed(() => currentTurnUser.value?.id);
	const bindingTurnCountOnDesert = computed(() => currentTurnUser.value?.bindingTurnCountOnDesert as number);
	const currentTurnUserIsBindedDesertIsland = computed(() => {
		const currentTurnUserPositionTile = currentTurnUser.value?.currentPositionTile as BaseTile;

		return currentTurnUserPositionTile.type === TileType.DESERT_ISLAND
			&& bindingTurnCountOnDesert.value > 0;
	});

	return {
		currentTurnUserId,
		bindingTurnCountOnDesert,
		currentTurnUserIsBindedDesertIsland,
		rollDice: () => {
			if (currentTurnUserIsBindedDesertIsland.value) {
				dispatch('gameInterface/rollDiceOnDesertIsland');
			} else {
				dispatch('gameInterface/rollDice')
			}
		},
	};
};

export default defineComponent({
	name: 'BeforeUserCommand',
	props: {
		users: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	emits: ['trade-with-bank'],
	setup() {
		return {
			...useDiceData(),
			...useCurrentUserData(),
		};
	},
});
</script>
