<template>
	<p v-if="hasDiceResult">
		주사위 결과: {{ currentTurnDiceResult[0] }} + {{ currentTurnDiceResult[1] }} = {{ distanceToMove }}
	</p>
	<p>
		<strong v-if="isDouble">더블이 나왔습니다.</strong>
		{{ currentTurnUserId }} 유저의 턴 입니다. 거래를 하거나 주사위를 굴려서 게임을 진행 해주세요.
		거래를 먼저 진행한 후 주사위를 굴려주세요.
	</p>
	<button @click="$emit('trade-with-bank')">내 토지 팔기</button>
	<button @click="rollDice">주사위 굴리기(즉시 실행됩니다.)</button>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs} from 'vue';
import {useStore} from "vuex";

const useBoardContext = () => {
	const {
		state: { gameInterface },
		getters,
	} = useStore();

	const {
		currentTurnDiceResult,
		currentTurnUser,
	} = toRefs(gameInterface);

	return {
		hasDiceResult: computed(() => currentTurnDiceResult.value.length > 0),
		currentTurnUserId: computed(() => currentTurnUser.value.id),
		currentTurnDiceResult: computed(() => currentTurnDiceResult.value),
		isDouble: computed(() => getters['gameInterface/isDouble']),
		distanceToMove: computed(() => getters['gameInterface/distanceToMove']),
	};
};

const useRollDice = () => {
	const {
		dispatch
	} = useStore();

	return async () => {
		await dispatch('gameInterface/rollDice');
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
	emits: ['hide-game-interface', 'trade-with-bank'],
	setup() {
		return {
			...useBoardContext(),
			rollDice: useRollDice(),
		};
	},
});
</script>
