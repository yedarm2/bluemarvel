<template>
	<p>
		<strong v-if="isDouble">더블이 나왔습니다.</strong>
		{{ currentTurnUser.id }} 유저의 턴 입니다. 거래를 하거나 주사위를 굴려서 게임을 진행 해주세요.
		거래를 먼저 진행한 후 주사위를 굴려주세요.
	</p>
	<button @click="$emit('trade-with-bank')">내 토지 팔기</button>
	<button @click="rollDice">주사위 굴리기(즉시 실행됩니다.)</button>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";

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
	setup(_, { emit }) {
		const {
			state: { gameInterface },
			getters,
			commit
		} = useStore();

		function rollDice() {
			const getRandomNumber = (): number => Math.ceil(Math.random() * 6);
			commit('gameInterface/setCurrentTurnDiceResult', [getRandomNumber(), getRandomNumber()]);
			emit('hide-game-interface');
		}

		return {
			isDouble: computed(() => getters.isDouble),
			currentTurnUser: computed(() => gameInterface.currentTurnUser),
			rollDice,
		};
	},
});
</script>
